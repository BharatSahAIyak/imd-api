import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { ScheduleModule } from '@nestjs/schedule';
import { CronModule } from './crons/cron.module';
import { AdvisoryModule } from './providers/advisory/advisory.module';
import { WeatherModule } from './providers/weather/weather.module';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register(),
    ScheduleModule.forRoot(),
    CronModule,
    AdvisoryModule,
    WeatherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
