import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GamesService {
  constructor(private prisma: PrismaService) {}

  async create(createGameDto: CreateGameDto) {
    return this.prisma.game.create({
      data: createGameDto,
    });
  }

  async findAll() {
    return this.prisma.game.findMany();
  }

  async findOne(id: number) {
    const game = await this.prisma.game.findUnique({
      where: { id },
    });

    if (!game) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }

    return game;
  }

  async update(id: number, updateGameDto: UpdateGameDto) {
    try {
      return await this.prisma.game.update({
        where: { id },
        data: updateGameDto,
      });
    } catch (error) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.game.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }
  }
}
