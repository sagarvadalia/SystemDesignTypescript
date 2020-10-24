import { IsNotEmpty } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { User } from './User';

@Entity()
export class Researcher extends User {
	constructor(...args) {
		super();
		Object.assign(this, Researcher);
	}
	@Column({ type: 'text', nullable: false })
	@IsNotEmpty({ message: 'Research salary must be provided' })
	researchSalary: string;
	@Column({ nullable: false, type: 'integer' })
	@IsNotEmpty({ message: 'Research Office Number must be provided' })
	resarchOfficeNum: number;
}