import { Test, TestingModule } from '@nestjs/testing';
import { RoomsController } from './infrastructure/rooms.controller';
import * as request from 'supertest';
import { NestApplication } from '@nestjs/core';
import { HttpStatus } from '@nestjs/common';
import { RoomsModule } from './rooms.module';
import { RoomsInmemoryRepository } from './infrastructure/rooms-inmemory.repository';
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
  const req = () => request(app.getHttpServer());

  describe('POST /rooms', () => {
    it('should return status CREATED', () =>
      req()
        .post('/rooms')
        .send({ name: 'general' })
        .expect(HttpStatus.CREATED));

    it('returns 400 if name is not provided', () =>
      req().post('/rooms').expect(HttpStatus.BAD_REQUEST));

    it('saves new room in a store', async () => {
      await req()
        .post('/rooms')
        .send({ name: 'general' })
        .expect(HttpStatus.CREATED);

      const want = new Room({ name: 'general' }),
        got = roomsRepo.rooms.find((n) => n.name === 'general');

      expect(got).toEqual(want);
    });
  });
});
