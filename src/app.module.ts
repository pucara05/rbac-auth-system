import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [DatabaseModule, AuthModule, UsersModule],
})
export class AppModule {}
