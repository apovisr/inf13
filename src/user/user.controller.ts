import { Body, Controller, Get, HttpCode, Param, Post } from "@nestjs/common/decorators";
import { UserService } from "./user.service";
import { CreateUserDto, UserDto } from "./dto/user.dto";
import { NotFoundException } from "@nestjs/common/exceptions";

@Controller('users')
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<UserDto> {
    const user = await this.appService.getUser(id);
    if(user){
      return user;
    }
    throw new NotFoundException('User not found');
  }


  @Get()
  async getAllUsers(): Promise<UserDto[]> {
    return this.appService.getAllUsers();
  }

  @Post()
  @HttpCode(201)
  async createUser(@Body() createUser: CreateUserDto) {
    await this.appService.createUser(createUser);
  }


  @Get('not/group/:id')
  async getUserNotGroupMember(@Param('id') id: number): Promise<UserDto[]> {
    return  this.appService.getUserNotGroupMember(id);
  }
}
