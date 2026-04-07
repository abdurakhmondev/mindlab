import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReaclamDto } from './dto/create-reaclam.dto';
import { UpdateReaclamDto } from './dto/update-reaclam.dto';

@Injectable()
export class ReaclamsService {
  constructor(private prisma: PrismaService) {}

  async create(createReaclamDto: CreateReaclamDto) {
    return this.prisma.reaclam.create({
      data: createReaclamDto,
    });
  }

  async findAll() {
    return this.prisma.reaclam.findMany();
  }

  async findOne(id: number) {
    const reaclam = await this.prisma.reaclam.findUnique({
      where: { id },
    });

    if (!reaclam) {
      throw new NotFoundException(`Reaclam with ID ${id} not found`);
    }

    return reaclam;
  }

  async update(id: number, updateReaclamDto: UpdateReaclamDto) {
    try {
      return await this.prisma.reaclam.update({
        where: { id },
        data: updateReaclamDto,
      });
    } catch (error) {
      throw new NotFoundException(`Reaclam with ID ${id} not found`);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.reaclam.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Reaclam with ID ${id} not found`);
    }
  }
}
