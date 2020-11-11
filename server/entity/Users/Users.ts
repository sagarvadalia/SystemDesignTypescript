import * as argon2 from 'argon2';
import { IsEmail, IsNotEmpty } from 'class-validator';
import {
	BaseEntity,
	BeforeInsert,
	BeforeUpdate,
	Column,
	Entity,
	PrimaryColumn
} from 'typeorm';
@Entity()
export abstract class Users extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Users);
	}
	@PrimaryColumn({ type: 'integer' })
	userID: number;

	@Column({ type: 'text', nullable: false, width: 50, unique: true })
	@IsNotEmpty({ message: 'Username is required' })
	userName: string;

	@Column()
	@IsEmail({}, { message: 'Please use Email Format' })
	@IsNotEmpty({ message: 'Email is required' })
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
	// hashes psw whenever a user is inserted
	@BeforeInsert()
	async hashPassword(): Promise<void> {
		this.userPassword = await argon2.hash(this.userPassword);
	}
	// hashes psw everytime the user is updated
	//TODO: gotta change this so it only updates when psw is changed
	@BeforeUpdate()
	async hashPasswordUpdate(): Promise<void> {
		this.userPassword = await argon2.hash(this.userPassword);
	}
	//TODO: not sure what the return type should be here
	// class function that checks the password and returns an object with isMatch being the bool and message being the explanation
	async comparePassword(password: string, attemptCount: number): Promise<any> {
		if (attemptCount < 3) {
			try {
				if (await argon2.verify(password, this.userPassword)) {
					return { isMatch: true, message: 'passwords match!' };
				} else {
					return { isMatch: false, message: 'wrong password' };
				}
			} catch (error) {
				console.error(error);
				return { isMatch: false, message: error };
			}
		}
		return { isMatch: false, message: 'too many attempts' };
	}
}
