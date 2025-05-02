import { Module } from "@nestjs/common/decorators";
import { DatabaseModule } from "src/provider/database.module";
import { Expense } from "./entity/expense.entity";
import { DataSource } from "typeorm";
import { ExpenseService } from "./expense.service";
import { ExpenseController } from "./expense.controller";
import { ExpenseSplit } from "./entity/expense-split.entity";
import { GroupMemberModule } from "src/groupmember/group-member.module";

@Module({
  imports: [DatabaseModule, GroupMemberModule],
  controllers: [ExpenseController],
  providers: [
    {
      provide: 'EXPENSE_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Expense),
      inject: ['DATA_SOURCE'],
    },
    {
        provide: 'EXPENSE_SPLIT_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(ExpenseSplit),
        inject: ['DATA_SOURCE'],
      },
    ExpenseService],
})
export class ExpenseModule {}
