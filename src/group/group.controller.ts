import { Body, Controller, Get, HttpCode, Param, Post } from "@nestjs/common/decorators";
import { GroupService } from "./group.service";
import { CreateGroupDto, GroupDto } from "./dto/group.dto";
import { NotFoundException } from "@nestjs/common/exceptions";
import { Group } from "./entity/group.entity";

@Controller('groups')
export class GroupController {
  constructor(private readonly appService: GroupService) {}

  @Get(':id')
  async getGroup(@Param('id') id: number): Promise<Group> {
    return this.appService.getGroup(id);
  }

  @Post()
  @HttpCode(201)
  async createGroup(@Body() createGroup: CreateGroupDto) {
    this.appService.createGroup(createGroup);
  }

}
