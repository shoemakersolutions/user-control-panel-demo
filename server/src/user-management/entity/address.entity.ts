import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('user_address')
export class UserAddress {
    @PrimaryGeneratedColumn()
    id: string;

    @OneToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'userid' })
    user: User;

    @Column({ name: 'street' })
    street: string;

    @Column({ name: 'suite' })
    suite: string;

    @Column({ name: 'city' })
    city: string;

    @Column({ name: 'zipcode' })
    zipcode: string;

    @Column({ name: 'geo' })
    geo: string;
}