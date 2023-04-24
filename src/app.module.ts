import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RoomsModule } from './rooms/rooms.module';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot(),
    RoomsModule,
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const url = configService.get<string>('REDIS_CONNECTION_STRING');
        return { config: { url } };
      },
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const url = configService.get<string>('REDIS_CONNECTION_STRING');
        return { url };
      },
    }),
  ],
})
export class AppModule {}
