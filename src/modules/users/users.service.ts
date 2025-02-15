import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { RegisterDto } from '../auth/dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findUserByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }

  // Método para obtener todos los usuarios
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async createUser(registerDto: RegisterDto): Promise<User> {
    const saltRounds = 10;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const hashedPassword = await bcrypt.hash(registerDto.password, saltRounds);
    const { username } = registerDto;
    const newUser = this.usersRepository.create({
      username,
      password: hashedPassword,
    });
    return this.usersRepository.save(newUser);
  }
}
