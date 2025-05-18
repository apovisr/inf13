import { Module } from "@nestjs/common/decorators/modules";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { User } from "./entity/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService],
})
export class UserModule { }
