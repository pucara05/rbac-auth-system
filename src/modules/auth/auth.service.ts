// src/modules/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.usersService.findUserByUsername(username);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Intentar comparar la contraseña hasheada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Si la comparación falla, verificar si la contraseña está en texto plano
      if (user.password === password) {
        // Si coincide, hashear la contraseña y actualizar el usuario
        const hashedPassword = await bcrypt.hash(password, 10);
        await this.usersService.updateUserPassword(user.id, hashedPassword);
      } else {
        throw new UnauthorizedException('Invalid credentials');
      }
    }

    // Incluimos el rol en el payload para que el RolesGuard pueda leerlo
    const payload = {
      username: user.username,
      sub: user.id,
      role: user.role, // <-- Importante para el RolesGuard
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    // Crea el usuario (por defecto será 'user' en la entidad o en tu createUser)
    const user = await this.usersService.createUser(registerDto);

    // Incluimos el rol en el payload
    const payload = {
      username: user.username,
      sub: user.id,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
