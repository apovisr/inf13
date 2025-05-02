import { Inject, Injectable } from "@nestjs/common/decorators";
import { Repository } from "typeorm";
import { User } from "./entity/user.entity";
import { CreateUserDto, UserDto } from "./dto/user.dto";

@Injectable()
export class UserService {
  async createUser(createUser: CreateUserDto){
    await this.userRepository.save(createUser);
  }

  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async getUser(id: number): Promise<UserDto> {
      const user = await this.userRepository.findOne({ where: { id } });
      return user as UserDto;
  }
}
