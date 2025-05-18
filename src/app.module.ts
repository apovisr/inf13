import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';
import { GroupMemberModule } from './groupmember/group-member.module';
import { SettlementModule } from './settlement/settlement.module';
import { ExpenseModule } from './expense/expense.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { GroupMember } from './groupmember/entity/group-meber.entity';
import { Group } from './group/entity/group.entity';
import { Settlement } from './settlement/entity/settlement.entity';
import { Expense } from './expense/entity/expense.entity';
import { ExpenseSplit } from './expense/entity/expense-split.entity';

@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User, GroupMember, Group, Settlement, Expense, ExpenseSplit],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule, GroupModule, GroupMemberModule, SettlementModule, ExpenseModule
  ],
})
export class AppModule {}
