// src/modules/admin/admin.module.ts
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [UsersModule],
  controllers: [AdminController],
})
export class AdminModule {}