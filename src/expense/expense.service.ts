import { Inject, Injectable } from "@nestjs/common/decorators";
import { Repository } from "typeorm";
import { Expense, ExpenseSplitHelper } from "./entity/expense.entity";
import { CreateExpenseDto, ExpenseDto, ExpenseSplitDto } from "./dto/expense.dto";
import { ExpenseSplit } from "./entity/expense-split.entity";
import { GroupMember } from "src/groupmember/entity/group-meber.entity";
import { User } from "src/user/entity/user.entity";
import { GroupMemberService } from "src/groupmember/group-member.service";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ExpenseService {

	constructor(
		@InjectRepository(Expense)
		private expenseRepository: Repository<Expense>,
		@InjectRepository(ExpenseSplit)
		private expenseSplitRepository: Repository<ExpenseSplit>,
		@Inject()
		private groupMemberService: GroupMemberService,
	) { }


	async createExpense(createExpenseDto: CreateExpenseDto) {
		const groupMemberIds = createExpenseDto.expenseSplits.map(e => e.groupMemberId)
		
		await this.groupMemberService.validateGroupMembers(groupMemberIds, createExpenseDto.groupId);

		await this.expenseRepository.manager.transaction(
			async (transactionalEntityManager) => {
				const expense = await transactionalEntityManager.save(Expense, {
					...createExpenseDto,
					createdAt: new Date(),
					id: 0
				});
				const expenseSplits = createExpenseDto.expenseSplits.map(e => {
					return {
						...e,
						expenseId: expense.id
					};
				})
				await transactionalEntityManager.save(ExpenseSplit, expenseSplits);
			}
		);
	}

	async getExpense(id: number): Promise<ExpenseDto | undefined> {
		const expense = await this.expenseRepository.findOne({ where: { id } });
		if (!expense) {
			return undefined;
		}

		const expenseSplits = await this.expenseSplitRepository.createQueryBuilder('expenseSplit')
			.innerJoinAndSelect(GroupMember, 'groupMember', 'groupMember.id = expenseSplit.groupMemberId')
			.innerJoinAndSelect(User, 'user', 'user.id = groupMember.userId')
			.where('expenseSplit.expenseId = :id', { id })
			.select(['expenseSplit.id as id', 'groupMember.id as groupMemberId', 'user.name as groupMemberName',
				'expenseSplit.amount as amount'])
			.getRawMany<ExpenseSplitHelper>();

		const expenseSplitDtos = expenseSplits.map(e => this.mapToDto(e));

		const paidByGroupMember = await this.groupMemberService.getGroupMemberById(expense.groupMemberId);
		return {
			id: expense.id,
			name: expense.name,
			createdAt: expense.createdAt,
			totalAmount: expense.totalAmount,
			paidByGroupMember: paidByGroupMember,
			expenseSplits: expenseSplitDtos
		} as ExpenseDto;
	}

	private mapToDto(e: ExpenseSplitHelper): ExpenseSplitDto {
		return {
			id: e.id,
			amount: e.amount,
			member: {
				id: e.groupMemberId,
				name: e.groupMemberName
			}
		};
	}

	async getExpensesByGroupId(id: number): Promise<ExpenseDto[]> {

		const expenses: Expense[] = await this.expenseRepository.createQueryBuilder('expense')
			.innerJoin(GroupMember, 'groupMember', 'groupMember.id = expense.groupMemberId')
			.innerJoin(User, 'user', 'user.id = groupMember.userId')
			.where('groupMember.groupId = :id', { id })
			.select(['expense.id as id', 'expense.name as name', 'expense.totalAmount as totalAmount',
				'expense.createdAt as createdAt', 'groupMember.id as groupMemberId'])
			.getRawMany<Expense>();


		const expenseSplits = await this.expenseSplitRepository.createQueryBuilder('expenseSplit')
			.innerJoinAndSelect(GroupMember, 'groupMember', 'groupMember.id = expenseSplit.groupMemberId')
			.innerJoinAndSelect(User, 'user', 'user.id = groupMember.userId')
			.where('groupMember.groupId = :id', { id })
			.select(['expenseSplit.id as id', 'groupMember.id as groupMemberId', 'user.name as groupMemberName',
				'expenseSplit.amount as amount', 'expenseSplit.expenseId as expenseId'])
			.getRawMany<ExpenseSplitHelper>();

		return Promise.all(expenses.map(async (e) => {
			const paidByGroupMember = await this.groupMemberService.getGroupMemberById(e.groupMemberId);
			return {
				id: e.id,
				name: e.name,
				createdAt: e.createdAt,
				totalAmount: e.totalAmount,
				paidByGroupMember: paidByGroupMember, // This will be set later
				expenseSplits: expenseSplits.filter(e1 => e1.expenseId === e.id).map(e1 => this.mapToDto(e1))
			} as ExpenseDto;
		}));
	}

	async deleteExpense(id: number) {
		await this.expenseSplitRepository.delete({ expenseId: id })
		await this.expenseRepository.delete({ id });
	}
}
