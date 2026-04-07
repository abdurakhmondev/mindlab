import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { UpdateUserSkillDto } from './dto/update-user-skill.dto';

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
        info: { select: { name: true } },
      },
    });

    // Add online status to each user
    const usersWithStatus = await Promise.all(
      users.map(async (user) => ({
        id: user.id,
        email: user.email,
        name: user.info?.name,
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
        info: { select: { name: true } },
      },
    });

    return users.map((user) => ({
      id: user.id,
      email: user.email,
      name: user.info?.name,
      isOnline: true,
    }));
  }

  async getUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        info: { select: { name: true } },
      },
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.info?.name,
      isOnline: await this.redis.isUserOnline(user.id),
    };
  }

  async getUserInfo(userId: number) {
    const userInfo = await this.prisma.userInfo.findUnique({
      where: { userId },
    });

    if (!userInfo) {
      throw new NotFoundException(`UserInfo for user ${userId} not found`);
    }

    return userInfo;
  }

  async updateUserInfo(userId: number, updateDto: UpdateUserInfoDto) {
    // Upsert ensures that if the user does not have a UserInfo record yet, it is created.
    return this.prisma.userInfo.upsert({
      where: { userId },
      update: updateDto,
      create: {
        userId,
        ...updateDto,
      },
    });
  }

  async getUserSkills(userId: number) {
    const userSkills = await this.prisma.userSkill.findUnique({
      where: { userId },
    });

    if (!userSkills) {
      throw new NotFoundException(`UserSkill for user ${userId} not found`);
    }

    return userSkills;
  }

  async updateUserSkills(userId: number, updateDto: UpdateUserSkillDto) {
    return this.prisma.userSkill.upsert({
      where: { userId },
      update: updateDto,
      create: {
        userId,
        ...updateDto,
      },
    });
  }
}
