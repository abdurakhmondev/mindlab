import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}

  async getAllUsers() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    // Add online status to each user
    const usersWithStatus = await Promise.all(
      users.map(async (user) => ({
        ...user,
        isOnline: await this.redis.isUserOnline(user.id),
      })),
    );

    return usersWithStatus;
  }

  async getOnlineUsers() {
    const onlineUserIds = await this.redis.getOnlineUserIds();

    if (onlineUserIds.length === 0) {
      return [];
    }

    const users = await this.prisma.user.findMany({
      where: {
        id: {
          in: onlineUserIds,
        },
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    return users.map((user) => ({
      ...user,
      isOnline: true,
    }));
  }

  async getUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    if (!user) {
      return null;
    }

    return {
      ...user,
      isOnline: await this.redis.isUserOnline(user.id),
    };
  }
}
