// src/modules/users/dto/update-user-role.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Role } from 'src/modules/users/enums/roles.enum';


export class UpdateUserRoleDto {
  @ApiProperty({ enum: Role, example: Role.Admin, description: 'Nuevo rol del usuario' })
  @IsEnum(Role)
  role: Role;
}
