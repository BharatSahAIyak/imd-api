import { Logger, Module } from '@nestjs/common';
import { UPCARAdvisoryService } from './upcar.service';
import { UPCARAdvisoryController } from './upcar.controller';

@Module({
  imports: [],
  controllers: [UPCARAdvisoryController],
  providers: [UPCARAdvisoryService, Logger],
  exports: [UPCARAdvisoryService],
})
export class UPCARAdvisoryModule {}
