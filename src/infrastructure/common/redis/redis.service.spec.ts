import { Test } from '@nestjs/testing';
import { REDIS_CONFIGURATION_TOKEN, RedisConfigurations } from './redis.conf';
import { RedisService } from './redis.service';
import { Post, Prisma, PrismaClient, User } from '@prisma/client';
import { Logger } from '@nestjs/common';

describe('RedisService', () => {
  let sut: RedisService;
  const prisma = new PrismaClient();

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        {
          provide: REDIS_CONFIGURATION_TOKEN,
          useValue: {
            host: 'localhost',
            port: 6379,
          } as RedisConfigurations,
        },
        RedisService,
        Logger,
      ],
    }).compile();

    sut = app.get(RedisService);
  });

  afterAll(async () => {
    await sut.onModuleDestroy();
    await prisma.$disconnect();
  });

  describe('red-lock', () => {
    let user: User & { posts: Post[] };

    beforeAll(async () => {
      user = await prisma.user.create({
        data: {
          email: 'met@jifla.sy',
          name: 'Met Jifla',
          password: '997zbc7low',
          posts: {
            create: {
              title: 'Hello World',
              content: 'This is my first post',
            },
          },
        },
        include: { posts: true },
      });
    });

    afterAll(async () => {
      await prisma.postView.deleteMany();
      await prisma.post.deleteMany();
      await prisma.user.deleteMany();
    });

    it('게시물 조회수 증가 다중 요청 lock (성공)', async () => {
      // when
      await Promise.all(
        new Array(10).fill(0).map(async () => {
          const lock = await sut.lock(`user:${user.id}`);
          const post = await prisma.post
            .findFirst({ where: { id: user.posts[0].id } })
            .then((p) => {
              if (!p) throw new Error('Post not found');
              return p;
            });

          await prisma.postView.create({
            data: {
              postId: user.posts[0].id,
              viewerId: user.id,
            },
          });

          await prisma.post.update({
            where: { id: user.posts[0].id },
            data: { viewCount: post.viewCount + 1 },
          });

          await sut.releaseLock(lock);
        }),
      );

      // then
      const viewCount = await prisma.post
        .findUnique({ where: { id: user.posts[0].id } })
        .then((p) => p.viewCount);

      const normalizedViewCount = await prisma.postView.count({
        where: { postId: user.posts[0].id },
      });

      expect(viewCount).toEqual(normalizedViewCount);
    });

    it('게시물 조회수 증가 다중 요청 without lock (실패)', async () => {
      // when
      await Promise.all(
        new Array(10).fill(0).map(async () => {
          const post = await prisma.post
            .findFirst({ where: { id: user.posts[0].id } })
            .then((p) => {
              if (!p) throw new Error('Post not found');
              return p;
            });

          await prisma.postView.create({
            data: {
              postId: user.posts[0].id,
              viewerId: user.id,
            },
          });

          await prisma.post.update({
            where: { id: user.posts[0].id },
            data: { viewCount: post.viewCount + 1 },
          });
        }),
      );

      // then
      const viewCount = await prisma.post
        .findUnique({ where: { id: user.posts[0].id } })
        .then((p) => p.viewCount);

      const normalizedViewCount = await prisma.postView.count({
        where: { postId: user.posts[0].id },
      });

      expect(viewCount).not.toEqual(normalizedViewCount);
    });
  });
});
