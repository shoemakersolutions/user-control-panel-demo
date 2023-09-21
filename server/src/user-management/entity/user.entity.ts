import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne} from 'typeorm';
import { UserAddress } from './address.entity';
import { Company } from './company.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ name: 'externalid', nullable: true })
    externalId: string;

    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'username' })
    username: string;

    @Column({ name: 'email' })
    email: string;

    @OneToOne(() => UserAddress, (address) => address.user, { onDelete: 'CASCADE' })
    address: UserAddress;

    @Column({ name: 'phone' })
    phone: string;

    @Column({ name: 'website' })
    website: string;

    @ManyToOne(() => Company, (company) => company.users)
    @JoinColumn({ name: 'company' })
    company: Company;
    userToSave: any;

    constructor(id: string) {
        this.id = id;
    }
}