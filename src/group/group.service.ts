import { Inject, Injectable } from "@nestjs/common/decorators";
import { Repository } from "typeorm";
import { Group } from "./entity/group.entity";
import { CreateGroupDto, GroupDto } from "./dto/group.dto";

@Injectable()
export class GroupService {
  async createGroup(createGroup: CreateGroupDto){
    await this.GroupRepository.save(createGroup);
  }

  constructor(
    @Inject('GROUP_REPOSITORY')
    private GroupRepository: Repository<Group>,
  ) {}

  async getGroup(id: number): Promise<Group> {
      return this.GroupRepository.findOneOrFail({ where: { id } });
  }
}
