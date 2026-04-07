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
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('games')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new game' })
  @ApiResponse({
    status: 201,
    description: 'The game has been successfully created.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all games' })
  @ApiResponse({ status: 200, description: 'List of all games.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findAll() {
    return this.gamesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get game by ID' })
  @ApiParam({ name: 'id', description: 'Game ID' })
  @ApiResponse({ status: 200, description: 'The found game.' })
  @ApiResponse({ status: 404, description: 'Game not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.gamesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update game by ID' })
  @ApiParam({ name: 'id', description: 'Game ID' })
  @ApiResponse({
    status: 200,
    description: 'The game has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Game not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGameDto: UpdateGameDto,
  ) {
    return this.gamesService.update(id, updateGameDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete game by ID' })
  @ApiParam({ name: 'id', description: 'Game ID' })
  @ApiResponse({
    status: 200,
    description: 'The game has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Game not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.gamesService.remove(id);
  }
}
