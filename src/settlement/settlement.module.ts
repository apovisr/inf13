import { Module } from "@nestjs/common/decorators";
import { DatabaseModule } from "src/provider/database.module";
import { DataSource } from "typeorm";
import { SettlementService } from "./settlement.service";
import { SettlementController } from "./settlement.controller";
import { Settlement } from "./entity/settlement.entity";

@Module({
  imports: [DatabaseModule],
  controllers: [SettlementController],
  providers: [
    {
      provide: 'SETTLEMENT_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Settlement),
      inject: ['DATA_SOURCE'],
    },
    SettlementService],
})
export class SettlementModule {}