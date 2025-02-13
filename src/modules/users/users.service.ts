// src/modules/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { RegisterDto } from '../auth/dto/register.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findUserByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }

  // Nuevo método para obtener todos los usuarios
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async createUser(registerDto: RegisterDto): Promise<User> {
    const newUser = this.usersRepository.create(registerDto);
    return this.usersRepository.save(newUser);
  }
}
