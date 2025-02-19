import {
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiBearerAuth, ApiTags, ApiBody } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { UpdateUserRoleDto } from '../auth/dto/update-user-role.dto';

@ApiTags('Admin')
@ApiBearerAuth()
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  constructor(private readonly usersService: UsersService) {}

  // Listar todos los usuarios
  @Get('users')
  @Roles('admin')
  async getAllUsers() {
    return this.usersService.findAll();
  }

  // Actualizar el rol de un usuario
  @Patch('users/:id/role')
  @Roles('admin')
  @ApiBody({ type: UpdateUserRoleDto }) // Swagger mostrará un Request Body basado en UpdateUserRoleDto
  async updateUserRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ) {
    return this.usersService.updateUserRole(id, updateUserRoleDto.role);
  }

  // Eliminar un usuario
  @Delete('users/:id')
  @Roles('admin')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
