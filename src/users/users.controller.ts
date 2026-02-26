import { Controller, Get, Put, Delete, Body, Param, UseGuards, Logger, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LogsService } from '../logs/logs.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(
    private usersService: UsersService,
    private logsService: LogsService,
  ) {}

  @Get()
  async getAllUsers(@Req() req) {
    this.logger.log('GET /users called');
    const users = await this.usersService.findAll();
    this.logger.log(`Found ${users.length} users`);
    
    await this.logsService.create({
      userId: req.user?.id,
      userFio: req.user?.fio,
      userRole: req.user?.role,
      actionType: 'VIEW_USERS_LIST',
      description: `Просмотр списка пользователей`,
      targetInfo: `Всего пользователей: ${users.length}`,
      ipAddress: req.ip,
    });
    
    return users;
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateData: any,
    @Req() req,
  ) {
    const oldUser = await this.usersService.findOneById(id);
    const result = await this.usersService.update(id, updateData);
    
    await this.logsService.create({
      userId: req.user?.id,
      userFio: req.user?.fio,
      userRole: req.user?.role,
      actionType: 'UPDATE_USER',
      description: `Обновление пользователя: ${oldUser?.login}`,
      targetInfo: `ID: ${id}, Новые данные: ${JSON.stringify({
        fio: updateData.fio !== oldUser?.fio,
        login: updateData.login !== oldUser?.login,
        role: updateData.role !== oldUser?.role,
        passwordChanged: !!updateData.password,
      })}`,
      ipAddress: req.ip,
    });
    
    return result;
  }

  @Delete(':id')
  async deleteUser(
    @Param('id') id: number,
    @Req() req,
  ) {
    const user = await this.usersService.findOneById(id);
    await this.usersService.remove(id);
    
    await this.logsService.create({
      userId: req.user?.id,
      userFio: req.user?.fio,
      userRole: req.user?.role,
      actionType: 'DELETE_USER',
      description: `Удаление пользователя: ${user?.login}`,
      targetInfo: `ID: ${id}, ФИО: ${user?.fio}, Роль: ${user?.role}`,
      ipAddress: req.ip,
    });
    
    return { success: true, message: `Пользователь ${user?.login} удален` };
  }
}