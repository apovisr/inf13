import { Injectable } from "@nestjs/common/decorators";
import { Repository } from "typeorm";
import { User } from "./entity/user.entity";
import { CreateUserDto, UserDto } from "./dto/user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { GroupMember } from "src/groupmember/entity/group-meber.entity";
import { Group } from "src/group/entity/group.entity";

@Injectable()
export class UserService {
  async createUser(createUser: CreateUserDto){
    await this.userRepository.save(createUser);
  }

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUser(id: number): Promise<UserDto> {
      const user = await this.userRepository.findOne({ where: { id } });
      return user as UserDto;
  }

  async getAllUsers(): Promise<UserDto[]> {
    return this.userRepository.find()
  }

  async getUserNotGroupMember(id: number): Promise<UserDto[]> {
    return this.userRepository
    .createQueryBuilder('user')
    .where('user.id NOT IN ' +
      '(SELECT groupMember.userId FROM groupMember WHERE groupMember.groupId = :id)', { id })
    .select(['user.id as id', 'user.name as name', 'user.email as email'])
    .getRawMany<UserDto>();

  }
}
