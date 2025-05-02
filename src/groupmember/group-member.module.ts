import { Module } from "@nestjs/common/decorators/modules";
import { DatabaseModule } from "src/provider/database.module";
import { DataSource } from "typeorm";
import { GroupMemberController } from "./group-member.controller";
import { GroupMemberService } from "./group-member.service";
import { GroupMember } from "./entity/group-meber.entity";
import { User } from "src/user/entity/user.entity";


@Module({
  imports: [DatabaseModule],
  controllers: [GroupMemberController],
  providers: [
    {
      provide: 'GROUP_MEMBER_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(GroupMember),
      inject: ['DATA_SOURCE'],
    },
    GroupMemberService],
    exports: [GroupMemberService]
})
export class GroupMemberModule {}
