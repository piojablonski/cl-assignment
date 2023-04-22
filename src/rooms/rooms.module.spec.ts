import { Test, TestingModule } from '@nestjs/testing';
import { RoomsController } from './rooms.controller';
import * as request from 'supertest';
import { NestApplication } from '@nestjs/core';
import { HttpStatus } from '@nestjs/common';
import { RoomsModule } from './rooms.module';
import { RoomsInmemoryRepository } from './rooms-inmemory.repository';
import { RoomsRepository } from './application/rooms.repository';
import { Room } from './business/Room';

describe('RoomsController', () => {
  let app: NestApplication, roomsRepo: RoomsInmemoryRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RoomsModule],
    }).compile();

    roomsRepo = module.get<RoomsInmemoryRepository>(RoomsRepository);

    app = module.createNestApplication();

    await app.init();
  });

  describe('POST /rooms', () => {
    it('should return status CREATED', () =>
      request(app.getHttpServer())
        .post('/rooms')
        .send({ name: 'general' })
        .expect(HttpStatus.CREATED));

    it('returns 400 if name is not provided', () =>
      request(app.getHttpServer())
        .post('/rooms')
        .expect(HttpStatus.BAD_REQUEST));

    it('saves new room in a store', async () => {
      await request(app.getHttpServer())
        .post('/rooms')
        .send({ name: 'general' })
        .expect(HttpStatus.CREATED);

      const want = new Room({ name: 'general' }),
        got = roomsRepo.rooms.find((n) => n.name === 'general');

      expect(got).toEqual(want);
    });
  });
});
