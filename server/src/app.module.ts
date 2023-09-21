import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserManagementModule } from './user-management/user-management.module';
import { UserManagementController } from './user-management/user-management.controller';
import { UserManagementService } from './user-management/user-management.service';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'userservice',
      entities: [join(__dirname, './**/entity/*.entity{.ts,*.js}')],
      synchronize: false,
      migrationsRun: true,
      migrations: [join(__dirname, '../migrations/{.ts,*.js}')],
    }),
    RouterModule.register([
      {
        path: 'usermanagement',
        module: UserManagementModule,
      }
    ]),
    UserManagementModule
  ],
  
  controllers: [UserManagementController],
  providers: [UserManagementService],
})

export class AppModule {}
