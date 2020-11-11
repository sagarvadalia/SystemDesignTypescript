import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { Advisor } from '../JoinTables/Advisor';
import { Enrollment } from '../JoinTables/Enrollment';
import { StudentMinor } from '../JoinTables/StudentMinor';
import { Users } from './Users';
import { StudentHold } from '../JoinTables/StudentHold';

@Entity()
export class Student extends Users {
	constructor(...args) {
		super();
		Object.assign(this, Users);
		Object.assign(this, Student);
	}

	@Column({ type: 'decimal' })
	@IsNotEmpty({ message: 'GPA is required' })
	sGPA: number;

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

	// association between students and advisors so that you can retrieve all advisors from a student query
	// set to cascade so that when a student is inserted, that information also populates the advisor table
	@OneToMany(() => Advisor, (advisor) => advisor.sID, { cascade: true })
	public advisors!: Advisor[];

	@OneToMany(() => Enrollment, (enrollment) => enrollment.sID, { cascade: true })
	public enrollment!: Enrollment[];

	@OneToMany(() => StudentMinor, (studentMinors) => studentMinors.sID, { cascade: true })
	public studentMinors!: StudentMinor[];

	@OneToMany(() => StudentHold, (studentHolds) => studentHolds.sID, { cascade: true })
	public studentHolds!: StudentHold[];
}
