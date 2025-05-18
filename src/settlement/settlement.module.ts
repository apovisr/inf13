import { Module } from "@nestjs/common/decorators";
import { SettlementService } from "./settlement.service";
import { SettlementController } from "./settlement.controller";
import { Settlement } from "./entity/settlement.entity";
import { GroupMemberModule } from "src/groupmember/group-member.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Settlement]), GroupMemberModule],
  controllers: [SettlementController],
  providers: [
    SettlementService],
})
export class SettlementModule {}