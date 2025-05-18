import { Module } from "@nestjs/common/decorators";
import { Expense } from "./entity/expense.entity";
import { ExpenseService } from "./expense.service";
import { ExpenseController } from "./expense.controller";
import { ExpenseSplit } from "./entity/expense-split.entity";
import { GroupMemberModule } from "src/groupmember/group-member.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Expense, ExpenseSplit]), GroupMemberModule],
  controllers: [ExpenseController],
  providers: [
    ExpenseService],
})
export class ExpenseModule { }
