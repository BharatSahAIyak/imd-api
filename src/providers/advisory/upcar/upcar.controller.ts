import { Body, Controller, Get, Injectable, Logger, Post } from "@nestjs/common";
import { UPCARAdvisoryService } from "./upcar.service";

@Injectable()
@Controller('upcar')
export class UPCARController {
  constructor(private readonly UPCARAdvisoryService: UPCARAdvisoryService, private readonly logger: Logger) {
    this.logger = new Logger(UPCARController.name);
  }

  @Get('')
  async getAdvisory() {
    this.logger.log('Getting UPCAR Advisory');
    return this.UPCARAdvisoryService.getAdvisory();
  }

  @Post('')
  async updateAdvisory(@Body() data: any) {
    this.logger.log('Updating UPCAR Advisory');
    return this.UPCARAdvisoryService.updateAdvisory(data);
  }

}
