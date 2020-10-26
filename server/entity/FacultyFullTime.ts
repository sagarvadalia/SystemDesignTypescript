import { IsNotEmpty } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { Faculty } from './Faculty';

@Entity()
export class FacultyFullTime extends Faculty {
	constructor(...args) {
		super();
		Object.assign(this, FacultyFullTime);
	}

	@Column({ type: 'text', nullable: false })
	@IsNotEmpty({ message: 'Faculty Salary is required' })
	fSalary: string;

	@Column({ type: 'text', nullable: false })
	@IsNotEmpty({ message: 'teachOrResearch is required' })
	teachOrResearch: string;

	@Column({ type: 'boolean', nullable: false })
	@IsNotEmpty({ message: 'Faculty Tenure is required' })
	fTenure: boolean;
}
