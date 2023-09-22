import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserManagementService } from './user-management.service';
import { User } from './entity/user.entity';
import { Company } from './entity/company.entity';
import { DeleteUsersDto } from './dto/delete-users.dto';

@Controller('usermanagement')
export class UserManagementController {
    constructor(
        private readonly userManagementService: UserManagementService,
    ) {}

    @Get('/find')
    async getAllUsers(): Promise<User[]> {
        console.debug('Fetching users');
        return this.userManagementService.findAll();
    }

    @Get('/company')
    async getAllCompanies(): Promise<Company[]> {
        console.debug('Fetching company');
        return this.userManagementService.findAllCompanies();
    }

    @Post('/upsert')
    async postUsers(@Body() addUsersDto: User[]): Promise<void> {
        console.debug('Posting users', addUsersDto);
        return this.userManagementService.upsert(addUsersDto);
    }

    @Post('/delete')
    async deleteUsers(@Body() deleteUsersDto: DeleteUsersDto): Promise<void> {
        console.debug('Deleting users', deleteUsersDto);
        return this.userManagementService.delete(deleteUsersDto);
    }
    
}