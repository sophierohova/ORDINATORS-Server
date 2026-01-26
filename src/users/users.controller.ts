import { Controller, Get, Put, Delete, Body, Param, UseGuards, Logger } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    this.logger.log('GET /users called');
    const users = await this.usersService.findAll();
    this.logger.log(`Found ${users.length} users`);
    return users;
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateData: any,
  ) {
    return this.usersService.update(id, updateData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}