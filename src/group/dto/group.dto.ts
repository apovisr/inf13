export interface  GroupDto{
    readonly id: number;
    readonly name: string;
    readonly description?: string;
}

export interface  CreateGroupDto{
    readonly name: string;
    readonly description?: string;
}