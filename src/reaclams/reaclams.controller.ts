import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ReaclamsService } from './reaclams.service';
import { CreateReaclamDto } from './dto/create-reaclam.dto';
import { UpdateReaclamDto } from './dto/update-reaclam.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('reaclams')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('reaclams')
export class ReaclamsController {
  constructor(private readonly reaclamsService: ReaclamsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new reaclam' })
  @ApiResponse({
    status: 201,
    description: 'The reaclam has been successfully created.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  create(@Body() createReaclamDto: CreateReaclamDto) {
    return this.reaclamsService.create(createReaclamDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all reaclams' })
  @ApiResponse({ status: 200, description: 'List of all reaclams.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findAll() {
    return this.reaclamsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get reaclam by ID' })
  @ApiParam({ name: 'id', description: 'Reaclam ID' })
  @ApiResponse({ status: 200, description: 'The found reaclam.' })
  @ApiResponse({ status: 404, description: 'Reaclam not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reaclamsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update reaclam by ID' })
  @ApiParam({ name: 'id', description: 'Reaclam ID' })
  @ApiResponse({
    status: 200,
    description: 'The reaclam has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Reaclam not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReaclamDto: UpdateReaclamDto,
  ) {
    return this.reaclamsService.update(id, updateReaclamDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete reaclam by ID' })
  @ApiParam({ name: 'id', description: 'Reaclam ID' })
  @ApiResponse({
    status: 200,
    description: 'The reaclam has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Reaclam not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.reaclamsService.remove(id);
  }
}
