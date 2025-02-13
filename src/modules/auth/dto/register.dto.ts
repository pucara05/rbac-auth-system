// src/modules/auth/dto/register.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'delphine' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
