import { Module } from "@nestjs/common/decorators/modules";
import { GroupMemberController } from "./group-member.controller";
import { GroupMemberService } from "./group-member.service";
import { GroupMember } from "./entity/group-meber.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExpenseSplit } from "../expense/entity/expense-split.entity";
import { Expense } from "../expense/entity/expense.entity";
import { Settlement } from "src/settlement/entity/settlement.entity";


@Module({
    imports: [TypeOrmModule.forFeature([GroupMember, Expense, ExpenseSplit, Settlement])],
  controllers: [GroupMemberController],
  providers: [
    GroupMemberService],
    exports: [GroupMemberService]
})
export class GroupMemberModule {}
