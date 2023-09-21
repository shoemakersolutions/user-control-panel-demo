import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserManagementModule } from './user-management/user-management.module';
import { UserManagementController } from './user-management/user-management.controller';
import { UserManagementService } from './user-management/user-management.service';
import * as fs from 'fs';
import { join } from 'path';


const dbConfig = JSON.parse(
  fs.readFileSync('./db-config.json', { encoding: 'utf8' })
);
console.log(join(__dirname, './user-management/entity/{.ts,*.js}'));
@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dbConfig,
      type: 'postgres',
      entities: [join(__dirname, './**/entity/*.entity{.ts,*.js}')],
      synchronize: false,
      migrationsRun: true,
      migrations: [join(__dirname, '../migrations/{.ts,*.js}')],
      cli: {
        migrationsDir: 'migrations'
      }
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
