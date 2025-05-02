import { Body, Controller, Get, HttpCode, Param, Post } from "@nestjs/common/decorators";
import { SettlementService } from "./settlement.service";
import { CreateSettlementDto, SettlementDto } from "./dto/settlement.dto";
import { NotFoundException } from "@nestjs/common/exceptions";

@Controller('settlements')
export class SettlementController {
  constructor(private readonly settlementService: SettlementService) {}

  @Post()
  @HttpCode(201)
  async createSettlement(@Body() createSettlement: CreateSettlementDto) {
    this.settlementService.createSettlement(createSettlement);
  }

  @Get(':id')
  async getSettlement(@Param('id') id: number): Promise<SettlementDto|undefined> {
    const settlement = this.settlementService.getSettlement(id);
    if(settlement){
      return settlement;
    }
    throw new NotFoundException('Invalid settlement');
  }

  @Get('group/:id')
  async getSettlementByGroupId(@Param('id') id: number): Promise<SettlementDto[]> {
    const settlement = this.settlementService.getSettlementByGroupId(id);
    if(settlement){
      return settlement;
    }
    throw new NotFoundException('Invalid Group');
  }
}
