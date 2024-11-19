import { Logger, Module } from '@nestjs/common';
import { OUATAdvisoryService } from './ouat.service';
import { OUATAdvisoryController } from './ouat.controller';

@Module({
  imports: [],
  controllers: [OUATAdvisoryController],
  providers: [OUATAdvisoryService, Logger],
  exports: [OUATAdvisoryService],
})
export class OUATAdvisoryModule {}
