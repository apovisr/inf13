import { Injectable } from "@nestjs/common/decorators";
import { Repository } from "typeorm";
import { User } from "./entity/user.entity";
import { CreateUserDto, UserDto } from "./dto/user.dto";
import { InjectRepository } from "@nestjs/typeorm";

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
}
