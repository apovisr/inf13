export interface  GroupMemberDto{
    readonly id: number;
    readonly name: string;
    readonly userId?: number;
}

export interface  CreateGroupMemberDto{
    readonly userId: number;
    readonly groupId: number;
}