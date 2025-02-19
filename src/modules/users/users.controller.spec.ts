import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { NotFoundException } from '@nestjs/common';
import { User } from './users.entity';

// Creamos un mock para UsersService con los métodos que se usan en el controlador.
const mockUsersService = {
  findAll: jest.fn(),
  findUserByUsername: jest.fn(),
};

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  // beforeEach se ejecuta antes de cada prueba para configurar el entorno.
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  // Prueba básica: verificar que el controlador se ha definido
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Grupo de pruebas para el endpoint GET /users
  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      // Definimos un resultado simulado (mock) para findAll.
      const result: User[] = [
        {
          id: 1,
          username: 'delphine',
          password: 'hashedPassword',
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      // Configuramos el mock para que retorne el resultado.
      mockUsersService.findAll.mockResolvedValueOnce(result);

      // Llamamos al método del controlador y verificamos que se retorne el array esperado.
      expect(await controller.getAllUsers()).toEqual(result);
    });
  });

  // Grupo de pruebas para el endpoint GET /users/:username
  describe('getUser', () => {
    it('should return a user when found', async () => {
      const mockUser: User = {
        id: 1,
        username: 'delphine',
        password: 'hashedPassword',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      // Configuramos el mock para que retorne el usuario simulado.
      mockUsersService.findUserByUsername.mockResolvedValueOnce(mockUser);

      // Verificamos que el método getUser del controlador retorne el usuario.
      expect(await controller.getUser('delphine')).toEqual(mockUser);
    });

    it('should throw NotFoundException when user is not found', async () => {
      // Configuramos el mock para que retorne null cuando se busque un usuario inexistente.
      mockUsersService.findUserByUsername.mockResolvedValueOnce(null);

      // Verificamos que al llamar al método getUser se lance una excepción NotFoundException.
      await expect(controller.getUser('nonexistent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
