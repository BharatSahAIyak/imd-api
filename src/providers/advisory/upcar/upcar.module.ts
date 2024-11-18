import { Logger, Module } from '@nestjs/common';
import { UPCARAdvisoryService } from './upcar.service';

@Module({
  imports: [],
  providers: [UPCARAdvisoryService, Logger],
  exports: [UPCARAdvisoryService],
})
export class UPCARAdvisoryModule {}
