import { Body, Controller, Delete, Get, HttpCode, Param, Post } from "@nestjs/common/decorators";
import { GroupMemberService } from "./group-member.service";
import { CreateGroupMemberDto, GroupMemberDto } from "./dto/group-member.dto";

@Controller('group-members')
export class GroupMemberController {
  constructor(private readonly groupMemberService: GroupMemberService) {}

  @Get('/group/:id')
  async getGroupMemberByGroup(@Param('id') id: number):Promise<GroupMemberDto[]> {
    return this.groupMemberService.getGroupMemberByGroupId(id);
  }

  @Post()
  @HttpCode(201)
  async createGroupMember(@Body() createGroupMember: CreateGroupMemberDto) {
    await this.groupMemberService.createGroupMember(createGroupMember);
  }


  @Delete('/:id')
  @HttpCode(204)
  async deleteGroupMember(@Param('id') id: number) {
    await this.groupMemberService.deleteGroupMember(id);
  }

}
