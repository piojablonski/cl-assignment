import { Module, ValidationPipe } from '@nestjs/common';
import { RoomsController } from './infrastructure/rooms.controller';
import { APP_PIPE } from '@nestjs/core';
import { RoomsService } from './application/rooms.service';
import { RoomsRepository } from './application/rooms.repository';
import { BullModule } from '@nestjs/bull';
import { Queues } from './application/queues';
import { RoomsQueueProcessor } from './application/rooms-queue.processor';
import { RoomsRedisRepository } from './infrastructure/rooms-redis.repository';

@Module({
  imports: [
    BullModule.registerQueue({
      name: Queues.MESSAGES,
    }),
  ],
  controllers: [RoomsController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    RoomsService,
    {
      provide: RoomsRepository,
      useClass: RoomsRedisRepository,
    },
    RoomsQueueProcessor,
  ],
})
export class RoomsModule {}
