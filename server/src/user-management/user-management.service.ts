import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { User } from './entity/user.entity';
import { UserAddress } from './entity/address.entity';
import { Company } from './entity/company.entity';
import { DeleteUsersDto } from './dto/delete-users.dto';

@Injectable()
export class UserManagementService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(UserAddress)
        private userAddressRepository: Repository<UserAddress>,
        @InjectRepository(Company)
        private companyRepository: Repository<Company>,
    ) {}

    async findAll(): Promise<User[]> {
        return this.userRepository.find({ relations: {
            address: true,
            company: true,
        }});
    }

    async findAllCompanies(): Promise<Company[]> {
        return this.companyRepository.find();
    }

    async create(addUsersDto: User[]): Promise<void> {
        for (const user of addUsersDto) {
            const userToSave = { ...user };

            if (user.company?.id) {
                userToSave.company =
                    await this.companyRepository.findOne({ where: { name: user.company.name } }) ||
                    await this.companyRepository.save(this.companyRepository.create(user.company));
            }

            const savedUser = await this.userRepository.save(
                this.userRepository.create(userToSave)
            );

            if (user.address) {
                const address =
                    await this.userAddressRepository.findOne({ relations: { user: true }, where: { user: { id: savedUser.id }}}) ||
                    this.userAddressRepository.create(user.address);

                await this.userAddressRepository.save({
                    ...address,
                    ...user.address,
                    user: new User(savedUser.id),
                });
            }
        }
    }
    
    async delete(deleteUsersDto: DeleteUsersDto): Promise<void> {
        const { ids } = deleteUsersDto;
        await this.userRepository.delete({ id: In(ids) });
    }
}