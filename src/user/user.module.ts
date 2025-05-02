import { Module } from "@nestjs/common/decorators/modules";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { DatabaseModule } from "src/provider/database.module";
import { DataSource } from "typeorm";
import { User } from "./entity/user.entity";

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    {
      provide: 'USER_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
      inject: ['DATA_SOURCE'],
    },
    UserService],
})
export class UserModule {}
