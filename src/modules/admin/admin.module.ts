// src/modules/admin/admin.module.ts
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';

@Module({
  controllers: [AdminController],
})
export class AdminModule {}