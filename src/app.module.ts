import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';
import { GroupMemberModule } from './groupmember/group-member.module';
import { SettlementModule } from './settlement/settlement.module';
import { ExpenseModule } from './expense/expense.module';

@Module({
  imports: [UserModule, GroupModule, GroupMemberModule, SettlementModule, ExpenseModule],
})
export class AppModule {}
