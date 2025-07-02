import { Injectable } from "@nestjs/common/decorators";
import { Repository } from "typeorm";
import { GroupMember } from "./entity/group-meber.entity";
import { CreateGroupMemberDto, GroupMemberDto } from "./dto/group-member.dto";
import { User } from "src/user/entity/user.entity";
import { BadRequestException } from "@nestjs/common/exceptions";
import { InjectRepository } from "@nestjs/typeorm";
import { Settlement } from "src/settlement/entity/settlement.entity";
import { Expense } from "src/expense/entity/expense.entity";
import { ExpenseSplit } from "src/expense/entity/expense-split.entity";

@Injectable()
export class GroupMemberService {


  constructor(
    @InjectRepository(GroupMember)
    private groupMemberRepository: Repository<GroupMember>,
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
    @InjectRepository(ExpenseSplit)
    private expenseSplitRepository: Repository<ExpenseSplit>,
    @InjectRepository(Settlement)
    private settlementRepository: Repository<Settlement>,
  ) { }

  async createGroupMember(createGroupMember: CreateGroupMemberDto) {
    await this.groupMemberRepository.save(createGroupMember);
  }

  async getGroupMemberByGroupId(id: number): Promise<GroupMemberDto[]> {
    return this.groupMemberRepository.createQueryBuilder('groupMember')
      .innerJoinAndSelect(User, 'user', 'user.id = groupMember.userId')
      .where('groupMember.groupId = :id', { id })
      .select(['groupMember.id as id', 'user.name as name', 'user.id as userId'])
      .getRawMany<GroupMemberDto>();
  }

  async getGroupMemberById(id: number): Promise<GroupMemberDto> {
    const groupMember = await this.groupMemberRepository.createQueryBuilder('groupMember')
      .innerJoinAndSelect(User, 'user', 'user.id = groupMember.userId')
      .where('groupMember.id = :groupMemberId', { groupMemberId: id })
      .select(['groupMember.id as id', 'user.name as name', 'user.id as userId'])
      .getRawMany<GroupMemberDto>();
    if (groupMember.length === 0) {
      throw new BadRequestException('Group member not found');
    }
    return groupMember[0];
  }

  async validateGroupMembers(groupMemberIds: number[], groupId: number) {
    const count = await this.groupMemberRepository
      .createQueryBuilder('groupMember')
      .where('groupMember.id IN ( :ids )', { ids: groupMemberIds })
      .andWhere('groupMember.groupId = :groupId', { groupId })
      .getCount();
    if (count !== groupMemberIds.length) {
      throw new BadRequestException('Group members should belong to the same groups');
    }
  }

  async deleteGroupMember(id: number) {
    this.settlementRepository.delete({ fromGroupMemberId: id });
    this.settlementRepository.delete({ toGroupMemberId: id });

    const expenseSplits = await this.expenseSplitRepository.findBy({ groupMemberId: id });
    const expenseIdsBySplit = expenseSplits.map(e => e.expenseId);
    

    await Promise.all(expenseIdsBySplit.map(async id => {
      await this.expenseSplitRepository.delete({ expenseId: id });
      await this.expenseRepository.delete({ id: id });
    }));

    const expenses = await this.expenseRepository.findBy({ groupMemberId: id });
    const expenseIds = expenses.map(e => e.id);
    await Promise.all(expenseIds.map(async expenseId => {
      await this.expenseSplitRepository.delete({ expenseId: expenseId });
      await this.expenseRepository.delete({ id: expenseId });
    }));

    await this.groupMemberRepository.delete(id);
  }
}
