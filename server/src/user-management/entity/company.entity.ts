import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity('company')
export class Company {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'catchphrase' })
    catchPhrase: string;

    @Column({ name: 'bs' })
    bs: string;

    @OneToMany(() => User, (user) => user.company)
    users: User[];
}