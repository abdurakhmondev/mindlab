import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: RedisClientType;
  private readonly ONLINE_USERS_PREFIX = 'user:online:';
  private readonly ONLINE_USERS_SET = 'users:online';
  private readonly DEFAULT_TTL = 300; // 5 minutes

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    this.client = createClient({
      url:
        this.configService.get<string>('REDIS_URL') || 'redis://localhost:6379',
    });

    this.client.on('error', (err) => console.error('Redis Client Error', err));
    await this.client.connect();
    console.log('Redis connected successfully');
  }

  async onModuleDestroy() {
    await this.client.quit();
  }

  // Mark user as online
  async setUserOnline(
    userId: number,
    ttl: number = this.DEFAULT_TTL,
  ): Promise<void> {
    const key = `${this.ONLINE_USERS_PREFIX}${userId}`;
    await this.client.setEx(key, ttl, Date.now().toString());
    await this.client.sAdd(this.ONLINE_USERS_SET, userId.toString());
  }

  // Check if user is online
  async isUserOnline(userId: number): Promise<boolean> {
    const key = `${this.ONLINE_USERS_PREFIX}${userId}`;
    const exists = await this.client.exists(key);
    return exists === 1;
  }

  // Get all online user IDs
  async getOnlineUserIds(): Promise<number[]> {
    const userIds = await this.client.sMembers(this.ONLINE_USERS_SET);

    // Filter out users whose keys have expired
    const onlineUsers: number[] = [];
    for (const userId of userIds) {
      const isOnline = await this.isUserOnline(parseInt(userId));
      if (isOnline) {
        onlineUsers.push(parseInt(userId));
      } else {
        // Remove from set if expired
        await this.client.sRem(this.ONLINE_USERS_SET, userId);
      }
    }

    return onlineUsers;
  }

  // Remove user from online status
  async setUserOffline(userId: number): Promise<void> {
    const key = `${this.ONLINE_USERS_PREFIX}${userId}`;
    await this.client.del(key);
    await this.client.sRem(this.ONLINE_USERS_SET, userId.toString());
  }

  // Refresh user's online status (extend TTL)
  async refreshUserOnline(
    userId: number,
    ttl: number = this.DEFAULT_TTL,
  ): Promise<void> {
    const key = `${this.ONLINE_USERS_PREFIX}${userId}`;
    const exists = await this.client.exists(key);
    if (exists) {
      await this.client.expire(key, ttl);
    }
  }
}
