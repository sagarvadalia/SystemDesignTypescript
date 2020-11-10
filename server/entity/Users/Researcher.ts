import { IsNotEmpty } from 'class-validator';
import { AfterInsert, BeforeInsert, Column, Entity } from 'typeorm';
import { Users } from './Users';

@Entity()
export class Researcher extends Users {
	constructor(...args) {
		super();
		Object.assign(this, Users);
		Object.assign(this, Researcher);
	}

	@Column({ type: 'text', nullable: false })
	@IsNotEmpty({ message: 'Research salary must be provided' })
	researchSalary: string;

	@Column({ nullable: false })
	@IsNotEmpty({ message: 'Research Office Number must be provided' })
	researchOfficeNum: string;
}
