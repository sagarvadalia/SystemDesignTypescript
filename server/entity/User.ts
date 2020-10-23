import { IsEmail, IsMobilePhone, IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export abstract class User extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, User);
	}
	@PrimaryGeneratedColumn({ type: 'integer' })
	userID: number;

	@Column({ type: 'text', nullable: false, width: 50, unique: true })
	@IsNotEmpty({ message: 'Username is required' })
	userName: string;
	@Column()
	@IsEmail({}, { message: 'Please use Email Format' })
	@IsNotEmpty({ message: 'Email is required' })
	@Column()
	userEmail: string;
	@Column({ type: 'text', nullable: false, width: 20 })
	@IsNotEmpty({ message: 'Password is required' })
	userPassword: string;
	@Column({ type: 'text', nullable: false })
	userPhone: string;
	@Column({ type: 'text', nullable: false, unique: true })
	userAddress: string;
	@Column({ type: 'text' })
	userType: string;
}
