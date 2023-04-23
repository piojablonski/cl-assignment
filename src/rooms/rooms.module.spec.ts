import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { NestApplication } from '@nestjs/core';
import { HttpStatus } from '@nestjs/common';
import { RoomsModule } from './rooms.module';
import { RoomsInmemoryRepository } from './infrastructure/rooms-inmemory.repository';
import { RoomsRepository } from './application/rooms.repository';
import { Room } from './business/Room';

const createFakeRooms = () => [
  new Room({
    name: 'general',
  }),
];
describe('Rooms module', () => {
  let app: NestApplication, roomsRepo: RoomsInmemoryRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RoomsModule],
    })
      .overrideProvider(RoomsRepository)
      .useValue(new RoomsInmemoryRepository(createFakeRooms()))
      .compile();

    roomsRepo = module.get<RoomsInmemoryRepository>(RoomsRepository);

    app = module.createNestApplication();

    await app.init();
  });
  const req = () => request(app.getHttpServer());

  describe('POST /rooms', () => {
    it('returns 400 if name is not provided', () =>
      req().post('/rooms').expect(HttpStatus.BAD_REQUEST));

    it('saves new room in a store', async () => {
      await req()
        .post('/rooms')
        .send({ roomName: 'general' })
        .expect(HttpStatus.CREATED);

      const want = new Room({ name: 'general' }),
        got = roomsRepo.rooms.find((n) => n.name === 'general');

      expect(got).toEqual(want);
    });
  });

  describe('POST /rooms/:roomId/users', () => {
    it('returns 400 if name is not provided', () =>
      req().post('/rooms/general/users').expect(HttpStatus.BAD_REQUEST));

    it('saves user on the channel', async () => {
      await req()
        .post('/rooms/general/users')
        .send({ userName: 'Piotr' })
        .expect(HttpStatus.OK);

      const want = ['Piotr'],
        got = roomsRepo.rooms.find((n) => n.name === 'general').users;

      expect(got).toEqual(want);
    });
  });
});
