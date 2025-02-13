// src/modules/auth/dto/login.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'delphine' })
  @IsString()
  username: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  password: string;
}
