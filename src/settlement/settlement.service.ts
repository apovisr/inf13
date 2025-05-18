import { Inject, Injectable } from "@nestjs/common/decorators";
import { Settlement, SettlementHelper } from "./entity/settlement.entity";
import { Repository } from "typeorm";
import { CreateSettlementDto, SettlementDto } from "./dto/settlement.dto";
import { GroupMember } from "src/groupmember/entity/group-meber.entity";
import { User } from "src/user/entity/user.entity";
import { GroupMemberService } from "src/groupmember/group-member.service";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class SettlementService {


  constructor(
    @InjectRepository(Settlement)
    private settlementRepository: Repository<Settlement>,
    @Inject()
    private groupMemberService: GroupMemberService,
  ) { }

  async createSettlement(createSettlement: CreateSettlementDto) {
    await this.groupMemberService.validateGroupMembers([createSettlement.fromGroupMemberId, createSettlement.toGroupMemberId], createSettlement.groupId);

    const settlement: Settlement = {
      ...createSettlement,
      createdAt: new Date(),
      id: 0
    };
    await this.settlementRepository.save(settlement);
  }

  async getSettlement(id: number): Promise<SettlementDto | undefined> {
    const settlement = await this.settlementRepository.createQueryBuilder('settlement')
      .innerJoinAndSelect(GroupMember, 'fromGroupMember', 'fromGroupMember.id = settlement.fromGroupMemberId')
      .innerJoinAndSelect(GroupMember, 'toGroupMember', 'toGroupMember.id = settlement.toGroupMemberId')
      .innerJoinAndSelect(User, 'fromUser', 'fromUser.id = fromGroupMember.userId')
      .innerJoinAndSelect(User, 'toUser', 'toUser.id = toGroupMember.userId')
      .where('settlement.id = :id', { id })
      .select(['settlement.id as id', 'settlement.name as name', 'fromGroupMember.id as fromGroupMemberId', 'toGroupMember.id as toGroupMemberId', 'fromUser.name as fromUserName', 'toUser.name as toUserName', 'settlement.amount as amount', 'settlement.createdAt as createdAt'])
      .getRawOne<SettlementHelper>();

    if (settlement) {
      return this.mapperToDto(settlement);
    }
    return undefined
  }

  private mapperToDto(settlement: SettlementHelper) {
    const response: SettlementDto = {
      id: settlement.id,
      name: settlement.name,
      fromTo: {
        id: settlement.fromGroupMemberId,
        name: settlement.fromUserName
      },
      toMember: {
        id: settlement.toGroupMemberId,
        name: settlement.toUserName
      },
      amount: settlement.amount,
      createdAt: settlement.createdAt
    };
    return response;
  }

  async getSettlementByGroupId(id: number): Promise<SettlementDto[]> {
    const settlements = await this.settlementRepository.createQueryBuilder('settlement')
      .innerJoinAndSelect(GroupMember, 'fromGroupMember', 'fromGroupMember.id = settlement.fromGroupMemberId')
      .innerJoinAndSelect(GroupMember, 'toGroupMember', 'toGroupMember.id = settlement.toGroupMemberId')
      .innerJoinAndSelect(User, 'fromUser', 'fromUser.id = fromGroupMember.userId')
      .innerJoinAndSelect(User, 'toUser', 'toUser.id = toGroupMember.userId')
      .where('fromGroupMember.groupId = :id', { id })
      .andWhere('toGroupMember.groupId = :id', { id })
      .select(['settlement.id as id', 'settlement.name as name', 'fromGroupMember.id as fromGroupMemberId', 'toGroupMember.id as toGroupMemberId', 'fromUser.name as fromUserName', 'toUser.name as toUserName', 'settlement.amount as amount', 'settlement.createdAt as createdAt'])
      .getRawMany<SettlementHelper>();

    return settlements.map(e => this.mapperToDto(e));
  }
}