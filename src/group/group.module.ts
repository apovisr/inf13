import { Module } from "@nestjs/common/decorators/modules";
import { DatabaseModule } from "src/provider/database.module";
import { DataSource } from "typeorm";
import { Group } from "./entity/group.entity";
import { GroupService } from "./group.service";
import { GroupController } from "./group.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [GroupController],
  providers: [
    {
      provide: 'GROUP_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Group),
      inject: ['DATA_SOURCE'],
    },
    GroupService],
})
export class GroupModule {}
