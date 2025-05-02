import { Inject, Injectable } from "@nestjs/common/decorators";
import { Repository } from "typeorm";
import { GroupMember, Member } from "./entity/group-meber.entity";
import { CreateGroupMemberDto, GroupMemberDto } from "./dto/group-member.dto";
import { User } from "src/user/entity/user.entity";
import { BadRequestException } from "@nestjs/common/exceptions";

@Injectable()
export class GroupMemberService {

  constructor(
    @Inject('GROUP_MEMBER_REPOSITORY')
    private groupMemberRepository: Repository<GroupMember>
  ) {}

  async createGroupMember(createGroupMember: CreateGroupMemberDto){
    await this.groupMemberRepository.save(createGroupMember);
  }

  async getGroupMemberByGroupId(id: number): Promise<GroupMemberDto[]> {
      return this.groupMemberRepository.createQueryBuilder('groupMember')
      .innerJoinAndSelect(User, 'user', 'user.id = groupMember.userId')
      .where('groupMember.groupId = :id', { id })
      .select(['groupMember.id as id', 'user.name as name'])
      .getRawMany<GroupMemberDto>();
  }

  async validateGroupMembers(groupMemberIds: number[]) {
    const groups = await this.groupMemberRepository
    .createQueryBuilder('groupMember')
    .where('groupMember.id IN ( :ids )', { ids: groupMemberIds })
    .select('count(distinct(groupMember.groupId)) as count')
    .getRawOne<{count: number}>();
    if(groups?.count !== 1){
      throw new BadRequestException('Group members should belong to the same groups');
    }
  }
}
