import { IsNotEmpty } from 'class-validator';
import { BeforeInsert, Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Class } from '../ClassRelated/Class';
import { Advisor } from '../JoinTables/Advisor';
import { FacultyDepartment } from '../JoinTables/FacultyDepartment';
import { Room } from '../Locations/Room';
import { Users } from './Users';

@Entity()
export class Faculty extends Users {
	constructor(...args) {
		super();
		Object.assign(this, Users);
		Object.assign(this, Faculty);
	}

	@Column({ nullable: false, type: 'text' })
	@IsNotEmpty({ message: 'Faculty rank must be provided' })
	fRank: string;

	@Column({ nullable: false })
	@IsNotEmpty({ message: 'Faculty status must be provided' })
	isFullTime: boolean;

	// One Faculty is many advisors
	@OneToMany(() => Advisor, (advisor) => advisor.faculty, { cascade: true })
	public advisors!: Advisor[];

	// One Faculty belongs to many Departments
	@OneToMany(() => FacultyDepartment, (FacultyDepartment) => FacultyDepartment.faculty, { cascade: true })
	public FacultyDepartment!: FacultyDepartment[];

	//One faculty has many classes
	@OneToMany(() => Class, (classes) => classes.faculty, { cascade: true })
	public classes!: Class[];


}
