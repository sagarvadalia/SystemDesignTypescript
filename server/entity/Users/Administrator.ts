import { IsNotEmpty } from 'class-validator';
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Administrator extends User {
	constructor(...args) {
		super();
		Object.assign(this, Administrator);
	}

	@Column({ type: 'text', nullable: false })
	@IsNotEmpty({ message: 'Admin salary must be provided' })
	adminSalary: string;

	@Column({ nullable: false, type: 'text' })
	@IsNotEmpty({ message: 'Admin Office Number must be provided' })
	adminOfficeNum: string;
	@CreateDateColumn()
	createdAt: Date;
	@UpdateDateColumn()
	updatedAt: Date;
}
