import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

// Creamos un mock para el repositorio de User
const mockUserRepository = {
  findOneBy: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  // beforeEach se ejecuta antes de cada test para preparar el entorno
  beforeEach(async () => {
    // Creamos un módulo de pruebas y configuramos el provider de UsersService
    // inyectando el mock del repositorio en lugar del real.
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    // Obtenemos la instancia de UsersService y del repositorio mockeado.
    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  // Caso de prueba básico: verifica que el servicio esté definido.
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Prueba para findUserByUsername:
  it('should return a user when found', async () => {
    // Creamos un objeto usuario simulado (mock)
    const mockUser: User = {
      id: 1,
      username: 'delphine',
      password: 'hashedPassword',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Configuramos el método findOneBy para que retorne el usuario simulado
    mockUserRepository.findOneBy.mockResolvedValueOnce(mockUser);

    // Llamamos al método que estamos testeando
    const user = await service.findUserByUsername('delphine');

    // Verificamos que el usuario retornado sea el esperado
    expect(user).toEqual(mockUser);
    // Además, podemos verificar que findOneBy haya sido llamado con el argumento correcto
    expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({
      username: 'delphine',
    });
  });

  // Prueba para createUser: verificar que se cree un usuario con contraseña hasheada
  it('should create a user with hashed password', async () => {
    const registerDto = { username: 'delphine', password: '123456' };

    // Simulamos que bcrypt.hash devuelve un hash específico
    const fakeHashedPassword = 'fakeHashed123';
    jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce(fakeHashedPassword);

    // Configuramos el mock para el método create
    // Cuando se llame a create, se debe pasar un objeto que contenga el username y la contraseña hasheada
    mockUserRepository.create.mockImplementation((dto) => dto);

    // Simulamos el guardado en la base de datos
    const savedUser: User = {
      id: 1,
      username: 'delphine',
      password: fakeHashedPassword,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockUserRepository.save.mockResolvedValueOnce(savedUser);

    // Llamamos al método createUser del servicio
    const result = await service.createUser(registerDto);

    // Verificamos que bcrypt.hash fue llamado correctamente
    expect(bcrypt.hash).toHaveBeenCalledWith('123456', 10);

    // Verificamos que se haya llamado a create con el objeto esperado
    expect(mockUserRepository.create).toHaveBeenCalledWith({
      username: 'delphine',
      password: fakeHashedPassword,
    });

    // Verificamos que save retorne el usuario simulado
    expect(result).toEqual(savedUser);
  });
});
