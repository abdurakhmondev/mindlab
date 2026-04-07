import {
  Controller,
  Get,
  UseGuards,
  Param,
  Patch,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of all users.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('online')
  @ApiOperation({ summary: 'Get all online users' })
  @ApiResponse({ status: 200, description: 'List of online users.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async getOnlineUsers() {
    return this.usersService.getOnlineUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User data.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }

  @Get(':id/info')
  @ApiOperation({ summary: 'Get user info details by user ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Detailed user info.' })
  @ApiResponse({ status: 404, description: 'User info not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async getUserInfo(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserInfo(id);
  }

  @Patch(':id/info')
  @ApiOperation({ summary: 'Update user info details by user ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User info updated successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async updateUserInfo(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserInfoDto: UpdateUserInfoDto,
  ) {
    return this.usersService.updateUserInfo(id, updateUserInfoDto);
  }
}
