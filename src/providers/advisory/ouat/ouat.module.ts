import { Logger, Module } from '@nestjs/common';
import { OUATAdvisoryService } from './ouat.service';

@Module({
  imports: [],
  providers: [OUATAdvisoryService, Logger],
  exports: [OUATAdvisoryService],
})
export class OUATAdvisoryModule {}
