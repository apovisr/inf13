import { Injectable } from "@nestjs/common/decorators";
import { Repository } from "typeorm";
import { GroupMember } from "./entity/group-meber.entity";
import { CreateGroupMemberDto, GroupMemberDto } from "./dto/group-member.dto";
import { User } from "src/user/entity/user.entity";
import { BadRequestException } from "@nestjs/common/exceptions";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class GroupMemberService {

  constructor(
    @InjectRepository(GroupMember)
    private groupMemberRepository: Repository<GroupMember>
  ) {}

  async createGroupMember(createGroupMember: CreateGroupMemberDto){
    await this.groupMemberRepository.save(createGroupMember);
  }

  async getGroupMemberByGroupId(id: number): Promise<GroupMemberDto[]> {
      return this.groupMemberRepository.createQueryBuilder('groupMember')
      .innerJoinAndSelect(User, 'user', 'user.id = groupMember.userId')
      .where('groupMember.groupId = :id', { id })
      .select(['groupMember.id as id', 'user.name as name', 'user.id as userId'])
      .getRawMany<GroupMemberDto>();
  }

  async validateGroupMembers(groupMemberIds: number[], groupId: number) {
    const count = await this.groupMemberRepository
    .createQueryBuilder('groupMember')
    .where('groupMember.id IN ( :ids )', { ids: groupMemberIds })
    .andWhere('groupMember.groupId = :groupId', {groupId})
    .getCount();
    if(count !== groupMemberIds.length){
      throw new BadRequestException('Group members should belong to the same groups');
    }
  }
}
