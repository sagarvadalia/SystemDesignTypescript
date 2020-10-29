import { IsNotEmpty } from 'class-validator';
import { Column, CreateDateColumn, Entity, OneToMany, UpdateDateColumn } from 'typeorm';
import { Advisor } from '../JoinTables/Advisor';
import { FacultyDepartment } from '../JoinTables/FacultyDepartment';
import { User } from './User';

@Entity()
export class Faculty extends User {
	constructor(...args) {
		super();
		Object.assign(this, Faculty);
	}

	@Column({ nullable: false })
	@IsNotEmpty({ message: 'Department ID must be provided' })
	deptID: number;

	@Column({ nullable: false, type: 'text' })
	@IsNotEmpty({ message: 'Faculty rank must be provided' })
	fRank: string;

	@Column({ nullable: false, type: 'text' })
	@IsNotEmpty({ message: 'Faculty Office Number must be provided' })
	fOfficeNumber: string;

	@Column({ nullable: false, type: 'text' })
	@IsNotEmpty({ message: 'Faculty status must be provided' })
	isFullTime: boolean;

	// One Faculty is many advisors
	@OneToMany(() => Advisor, (advisor) => advisor.faculty, { cascade: true })
	public advisors!: Advisor[];

	// One Faculty belongs to many Departments
	@OneToMany(() => FacultyDepartment, (FacultyDepartment) => FacultyDepartment.faculty, { cascade: true })
	public FacultyDepartment!: FacultyDepartment[];
}
