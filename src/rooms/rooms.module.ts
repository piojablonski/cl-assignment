import { Module, ValidationPipe } from '@nestjs/common';
import { RoomsController } from './infrastructure/rooms.controller';
import { APP_PIPE } from '@nestjs/core';
import { RoomsService } from './application/rooms.service';
import { RoomsRepository } from './application/rooms.repository';
import { RoomsInmemoryRepository } from './infrastructure/rooms-inmemory.repository';

@Module({
  controllers: [RoomsController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    RoomsService,
    {
      provide: RoomsRepository,
      useClass: RoomsInmemoryRepository,
    },
  ],
})
export class RoomsModule {}
