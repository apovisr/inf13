export interface  GroupMemberDto{
    readonly id: number;
    readonly name: string;
}

export interface  CreateGroupMemberDto{
    readonly userId: number;
    readonly groupId: number;
}