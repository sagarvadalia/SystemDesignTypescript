import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { Advisor } from '../JoinTables/Advisor';
import { FacultyDepartment } from '../JoinTables/FacultyDepartment';
import { User } from './User';

@Entity()
export class Faculty extends User {
	constructor(...args) {
		super();
		Object.assign(this, Faculty);
	}
	// This sets an association between faculty and advisors
	// set to cascade so that you can create a faculty and fill in the join table with one query
	@OneToMany(() => Advisor, (advisor) => advisor.faculty, { cascade: true })
	public advisors!: Advisor[];
	// This sets an association between faculty and departments
	// set to cascade so that you can create a faculty and fill in the join table with one query
	@OneToMany(() => FacultyDepartment, (FacultyDepartment) => FacultyDepartment.faculty, { cascade: true })
	public FacultyDepartment!: FacultyDepartment[];

	@Column({ nullable: false })
	@IsNotEmpty({ message: 'Department ID must be provided' })
	deptID: number;

	@Column({ nullable: false })
	@IsNotEmpty({ message: 'Faculty rank must be provided' })
	fRank: number;

	@Column({ nullable: false, type: 'text' })
	@IsNotEmpty({ message: 'Faculty Office Number must be provided' })
	fOfficeNumber: string;

	@Column({ nullable: false, type: 'text' })
	@IsNotEmpty({ message: 'Faculty status must be provided' })
	isFullTime: boolean;
}
