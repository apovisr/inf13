export interface  UserDto{
    readonly id: number;
    readonly name: string;
    readonly email: string;
}

export interface  CreateUserDto{
    readonly name: string;
    readonly email: string;
}