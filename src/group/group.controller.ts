import { Body, Controller, Get, HttpCode, Param, Post } from "@nestjs/common/decorators";
import { GroupService } from "./group.service";
import { CreateGroupDto, GroupDto } from "./dto/group.dto";
import { NotFoundException } from "@nestjs/common";

@Controller('groups')
export class GroupController {
  constructor(private readonly appService: GroupService) { }

  @Get(':id')
  async getGroup(@Param('id') id: number): Promise<GroupDto> {
    const groupDto = await this.appService.getGroup(id);
    if (groupDto) {
      return groupDto;
    } else {
      throw new NotFoundException('Expense not found');
    }
  }

  @Post()
  @HttpCode(201)
  async createGroup(@Body() createGroup: CreateGroupDto) {
    this.appService.createGroup(createGroup);
  }

  @Get()
  async getAllGroup(): Promise<GroupDto[]> {
    return this.appService.getAllGroup();
  }
}
