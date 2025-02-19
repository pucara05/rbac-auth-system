// src/modules/admin/admin.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';




@ApiTags('Admin')
@ApiBearerAuth()  // Esto indica a Swagger que se requiere autenticación Bearer
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  @Get()
  @Roles('admin')
  getAdminData() {
    return {
      message: 'Esta ruta es solo para administradores.',
      data: {
        confidential: 'Información sensible de administración',
      },
    };
  }
}