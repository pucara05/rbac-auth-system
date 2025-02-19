import 'dotenv/config';
import { AppDataSource } from 'src/data-source';
import { User } from 'src/modules/users/users.entity';
import { Role } from 'src/modules/users/enums/roles.enum'; // Importa el enum
import * as bcrypt from 'bcrypt';

async function seed() {
  try {
    await AppDataSource.initialize();
    console.log('Database connection established for seeding.');

    const userRepository = AppDataSource.getRepository(User);

    const adminUsername = process.env.ADMIN_USERNAME;
    const existingAdmin = await userRepository.findOneBy({
      username: adminUsername,
    });

    if (existingAdmin) {
      console.log(`Admin user '${adminUsername}' already exists.`);
    } else {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(
        process.env.ADMIN_PASSWORD || '',
        saltRounds,
      );

      // Usa Role.Admin en lugar de la cadena "admin"
      const adminUser = userRepository.create({
        username: adminUsername,
        password: hashedPassword,
        role: Role.Admin,
      });

      await userRepository.save(adminUser);
      console.log(`Admin user '${adminUsername}' created successfully.`);
    }
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await AppDataSource.destroy();
    console.log('Database connection closed.');
  }
}

seed();
