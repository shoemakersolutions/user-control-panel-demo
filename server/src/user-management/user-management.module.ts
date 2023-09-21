import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserManagementController } from './user-management.controller';
import { UserManagementService } from './user-management.service';
import { User } from './entity/user.entity';
import { UserAddress } from './entity/address.entity';
import { Company } from './entity/company.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, UserAddress, Company])],
    controllers: [UserManagementController],
    providers: [UserManagementService],
    exports: [TypeOrmModule]
})
export class UserManagementModule {};