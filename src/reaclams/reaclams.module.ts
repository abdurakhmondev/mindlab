import { Module } from '@nestjs/common';
import { ReaclamsService } from './reaclams.service';
import { ReaclamsController } from './reaclams.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ReaclamsController],
  providers: [ReaclamsService],
})
export class ReaclamsModule {}
