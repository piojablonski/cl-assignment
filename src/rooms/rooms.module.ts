import { Module, ValidationPipe } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { APP_PIPE } from '@nestjs/core';

@Module({
  controllers: [RoomsController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class RoomsModule {}
