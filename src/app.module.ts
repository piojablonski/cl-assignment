import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [RoomsModule],
  controllers: [AppController],
})
export class AppModule {}
