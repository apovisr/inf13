import { Module } from "@nestjs/common/decorators/modules";
import { GroupMemberController } from "./group-member.controller";
import { GroupMemberService } from "./group-member.service";
import { GroupMember } from "./entity/group-meber.entity";
import { TypeOrmModule } from "@nestjs/typeorm";


@Module({
    imports: [TypeOrmModule.forFeature([GroupMember])],
  controllers: [GroupMemberController],
  providers: [
    GroupMemberService],
    exports: [GroupMemberService]
})
export class GroupMemberModule {}
