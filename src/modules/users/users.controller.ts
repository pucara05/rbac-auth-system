import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Endpoint para obtener todos los usuarios
  @Get()
  @ApiOkResponse({ description: 'Lista de usuarios', type: [User] })
  async getAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':username')
  @ApiOkResponse({ description: 'Detalle del usuario', type: User })
  async getUser(@Param('username') username: string): Promise<User> {
    const user = await this.usersService.findUserByUsername(username);
    if (!user) {
      throw new NotFoundException(`User with username "${username}" not found`);
    }
    return user;
  }
}
