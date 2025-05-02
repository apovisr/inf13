import { GroupMemberDto } from "src/groupmember/dto/group-member.dto";

export interface CreateExpenseDto {
    readonly name: string;
    readonly groupMemberId: number;
    readonly totalAmount: number;
    readonly expenseSplits: CreateExpenseSplitDto[];
}

export interface CreateExpenseSplitDto {
    readonly groupMemberId: number;
    readonly amount: number;
}

export interface ExpenseDto {
    readonly id: number;
    readonly name: string;
    readonly totalAmount: number;
    readonly paidByGroupMember: GroupMemberDto;
    readonly createdAt: Date;
    readonly expenseSplits: ExpenseSplitDto[];
}

export interface ExpenseSplitDto {
    readonly id: number;
    readonly member: GroupMemberDto;
    readonly amount: number;
}