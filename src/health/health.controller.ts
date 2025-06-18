import { Controller, Get } from "@nestjs/common";

@Controller()
export class HealthController {

  @Get()
  getHealth(): string {
    return 'OK';
  }

}
