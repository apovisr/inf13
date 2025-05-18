import { Injectable } from "@nestjs/common/decorators";
import { Repository } from "typeorm";
import { Group } from "./entity/group.entity";
import { CreateGroupDto, GroupDto } from "./dto/group.dto";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class GroupService {

  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}
  
  async createGroup(createGroup: CreateGroupDto){
    await this.groupRepository.save(createGroup);
  }



  async getGroup(id: number): Promise<GroupDto> {
      return this.groupRepository.findOneOrFail({ where: { id } });
  }

  async getAllGroup(): Promise<GroupDto[]> {
    return this.groupRepository.find();
  }
}
