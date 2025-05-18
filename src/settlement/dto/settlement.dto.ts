import { GroupMemberDto } from "src/groupmember/dto/group-member.dto";

export interface  CreateSettlementDto{
    readonly name: string;
    readonly fromGroupMemberId: number;
    readonly toGroupMemberId: number;
    readonly groupId: number
    readonly amount: number;
}

export interface  SettlementDto{
    readonly id: number;
    readonly name: string;
    readonly fromTo: GroupMemberDto;
    readonly toMember: GroupMemberDto;
    readonly amount: number;
    readonly createdAt: Date;
}