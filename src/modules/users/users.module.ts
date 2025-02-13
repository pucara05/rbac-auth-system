import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.entity'; // Asegúrate de importar la entidad

@Module({
  imports: [TypeOrmModule.forFeature([User])], // 🔥 Agrega esta línea  // Esto es necesario para inyectar el repositorio de User
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Exportar para usarlo en otros módulos como AuthModule
})
export class UsersModule {}
