import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { Advisor } from '../JoinTables/Advisor';
import { Enrollment } from '../JoinTables/Enrollment';
import { User } from './User';

@Entity()
export class Student extends User {
	constructor(...args) {
		super();
		Object.assign(this, Student);
	}
	// association between students and advisors so that you can retrieve all advisors from a student query
	// set to cascade so that when a student is inserted, that information also populates the advisor table
	@OneToMany(() => Advisor, (advisor) => advisor.student, { cascade: true })
	public advisors!: Advisor[];
	@OneToMany(() => Enrollment, (enrollment) => enrollment.student, { cascade: true })
	public enrollment!: Enrollment[];
	@Column()
	@IsNotEmpty({ message: 'GPA is required' })
	sGPA: string;

	@Column()
	@IsNotEmpty({ message: 'Grad year is required' })
	sGradYear: number;

	@Column()
	@IsNotEmpty({ message: 'Date of birth is required' })
	sDOB: string;

	@Column()
	@IsNotEmpty({ message: 'Number of total credits is required' })
	totalCredits: number;

	@Column()
	@IsNotEmpty({ message: 'Type of student is required' })
	studentType: string;
}
