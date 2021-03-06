import { IsNotEmpty } from 'class-validator';
import { Column, CreateDateColumn, Entity, UpdateDateColumn, createConnection } from 'typeorm';
import { Users } from './Users';

@Entity()
export class Administrator extends Users {
	constructor(...args) {
		super();
		Object.assign(this, Users);
		Object.assign(this, Administrator);
	}

	@Column({ type: 'text', nullable: false })
	@IsNotEmpty({ message: 'Admin salary must be provided' })
	adminSalary: string;

	@Column({ nullable: false })
	@IsNotEmpty({ message: 'Admin Office Number must be provided' })
	adminOfficeNum: number;

}
