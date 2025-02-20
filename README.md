<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

RBAC Auth System

Un sistema de autenticación y autorización basado en roles (RBAC) construido con NestJS, que utiliza JWT para la autenticación, bcrypt para el manejo seguro de contraseñas y una arquitectura modular para separar la lógica de usuarios, autenticación y administración.


Tabla de Contenidos

Características

Tecnologías

Arquitectura del Proyecto

Instalación

Configuración

Uso

Pruebas

Migraciones y Seeds

Mejoras Futuras

Licencia

Características

Autenticación: Registro e inicio de sesión con JWT.

Autorización basada en roles: Soporta al menos dos roles: user (por defecto) y admin.

Protección de endpoints: Guards para verificar autenticación y autorización.

Integración con Swagger: Documentación de la API con soporte para Bearer token.

Buenas prácticas de seguridad: Uso de bcrypt para hashear contraseñas, Helmet para cabeceras seguras y validación global con ValidationPipe.

Migraciones y Seeds: Gestión de base de datos con TypeORM y scripts de seed para crear un usuario administrador.

Tecnologías

NestJS: Framework progresivo de Node.js para construir aplicaciones escalables.

TypeORM: ORM para TypeScript que facilita la interacción con la base de datos.

JWT (JSON Web Token): Mecanismo para la autenticación y autorización sin estado.

bcrypt: Biblioteca para hashear contraseñas.

Swagger: Documentación interactiva de la API.

Helmet: Middleware para mejorar la seguridad de las cabeceras HTTP.

Arquitectura del Proyecto

La estructura del proyecto sigue una arquitectura modular para separar las responsabilidades:

src/
├── app.module.ts               // Módulo raíz que importa todos los módulos
├── main.ts                     // Punto de entrada de la aplicación
├── config/                     // Configuraciones globales (e.g., conexión a la BD)
│   ├── database.module.ts
│   └── data-source.ts          // Opcional, para migraciones
├── modules/
│   ├── auth/                   // Módulo de autenticación
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts  // Endpoints públicos: login, register
│   │   ├── auth.service.ts     // Lógica de autenticación (JWT, bcrypt)
│   │   ├── dto/                // DTOs para login y registro
│   │   ├── strategies/         // Estrategia JWT
│   │   ├── guards/             // Guards: JwtAuthGuard, RolesGuard
│   │   └── decorators/         // Decoradores personalizados (@Roles)
│   ├── users/                  // Módulo de usuarios
│   │   ├── users.module.ts
│   │   ├── users.controller.ts // Endpoints para operaciones sobre usuarios
│   │   ├── users.service.ts    // Lógica de negocio de usuarios
│   │   ├── users.entity.ts     // Entidad que define la tabla "users"
│   │   ├── dto/                // DTOs para operaciones de usuario (e.g., actualizar rol)
│   │   └── enums/              // Enumeración de roles (e.g., 'user', 'admin')
│   └── admin/                  // Módulo de administración
│       ├── admin.module.ts
│       └── admin.controller.ts // Endpoints protegidos para administradores
└── seeds/                      // Scripts de seed para inicialización (p.ej. crear admin)
    └── seed.ts


main.ts: Configura la aplicación (Helmet, CORS, Swagger, pipes de validación).

AppModule: Importa módulos como DatabaseModule, AuthModule, UsersModule, AdminModule.

AuthModule: Gestiona autenticación (JWT, bcrypt, estrategias, guards y decoradores).

UsersModule: Gestiona operaciones CRUD de usuarios, con la entidad y lógica asociada.

AdminModule: Ofrece endpoints administrativos protegidos por guards que requieren el rol 'admin'.

Seeds: Permite la inicialización de datos, como la creación de un usuario admin.


Instalación

Clonar el repositorio:

git clone https://github.com/tu-usuario/rbac-auth-system.git

cd rbac-auth-system

Instalar dependencias:


npm install

Configuración

Variables de entorno:

Crea un archivo .env en la raíz del proyecto con las siguientes variables (ajústalas según tu entorno):

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=tu_base_de_datos

JWT_SECRET=tu_clave_secreta

ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
PORT=3000

Uso
Iniciar la aplicación:

  npm run start ||  npm run start:dev  

  La aplicación se levantará en http://localhost:3000.

Acceder a la documentación Swagger: Visita http://localhost:3000/api para ver y probar los endpoints.

Autenticación:

Usa el endpoint POST /auth/register para registrar usuarios (se registran como user por defecto).

Usa el endpoint POST /auth/login para iniciar sesión y obtener el token JWT.

El token JWT incluirá información del usuario, incluyendo su rol, y se usará en la cabecera Authorization: Bearer <token> para acceder a endpoints protegidos.

Endpoints Administrativos:

Solo accesibles para usuarios con rol 'admin'.

Ejemplos:

GET /admin para obtener datos administrativos.

PATCH /admin/users/:id/role para actualizar el rol de un usuario.

DELETE /admin/users/:id para eliminar un usuario.

Pruebas

Pruebas Unitarias

npm run test

Pruebas End-to-End:

npm run test:e2e

Migraciones y Seeds

Migraciones:

Usa TypeORM para gestionar la estructura de la base de datos.

npm run migration:generate -- src/migrations/NombreMigracion

npm run migration:run

Seed:

Ejecuta el script de seed para crear un usuario admin:

npm run seed

Mejoras Futuras

Integrar OAuth2 para autenticación con proveedores externos (Google, Facebook, etc.).

Añadir un sistema de permisos más granular.

Implementar un dashboard administrativo.

Mejorar la configuración de seguridad (rate limiting, logs avanzados, etc.).

Licencia

MIT




[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
