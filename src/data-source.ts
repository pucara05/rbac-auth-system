import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from './modules/users/users.entity';


export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD , // Asegúrate que sea una cadena
  database: process.env.DB_NAME,
  entities: [User], // O usa un patrón como 'dist/**/*.entity{.ts,.js}'
  migrations: ['src/migrations/*.ts'], // O 'dist/migrations/*.js' si ya has compilado
  synchronize: false, // Se recomienda false en producción y cuando se usan migraciones
});
