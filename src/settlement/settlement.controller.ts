import { Body, Controller, Delete, Get, HttpCode, Param, Post } from "@nestjs/common/decorators";
import { SettlementService } from "./settlement.service";
import { CreateSettlementDto, SettlementDto } from "./dto/settlement.dto";
import { NotFoundException } from "@nestjs/common/exceptions";

@Controller('settlements')
export class SettlementController {
  constructor(private readonly settlementService: SettlementService) {}

  @Post()
  @HttpCode(201)
  async createSettlement(@Body() createSettlement: CreateSettlementDto) {
    await this.settlementService.createSettlement(createSettlement);
  }

  @Get(':id')
  async getSettlement(@Param('id') id: number): Promise<SettlementDto|undefined> {
    const SettlementDto = await this.settlementService.getSettlement(id);
    if(SettlementDto){
      return SettlementDto;
    }
    throw new NotFoundException('Invalid settlement');
  }

  @Get('group/:id')
  async getSettlementByGroupId(@Param('id') id: number): Promise<SettlementDto[]> {
    return this.settlementService.getSettlementByGroupId(id);
  }

  @Delete(':id')
  async deleteSettlement(@Param('id') id: number): Promise<void> {
    await this.settlementService.deleteSettlement(id);
  }
}
