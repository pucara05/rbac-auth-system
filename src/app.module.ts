import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AdminController } from './modules/admin/admin.controller';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [DatabaseModule, AuthModule, UsersModule, AdminModule],
  controllers: [AdminController],
})
export class AppModule {}
