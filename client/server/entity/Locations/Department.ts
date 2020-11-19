import { IsEmail, IsNotEmpty } from 'class-validator';
import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	OneToMany,
	OneToOne,
	PrimaryColumn,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Major } from '../ClassRelated/Major';
import { Minor } from '../ClassRelated/Minor';
import { FacultyDepartment } from '../JoinTables/FacultyDepartment';
import { Room } from './Room';
import { Course } from '../ClassRelated/Course';
import { Lecture } from './Lecture';
import { Office } from './Office';
import { Faculty } from '../Users/Faculty';
import { FacultyPartTime } from '../Users/FacultyPartTime';
import { FacultyFullTime } from '../Users/FacultyFullTime';

@Entity()
export class Department extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Department);
	}

	@PrimaryGeneratedColumn({ type: 'integer' })
	deptID: number;

	@Column({ type: 'text', nullable: false, width: 50, unique: true })
	@IsNotEmpty({ message: 'Department name is required' })
	deptName: string;

	@Column()
	@IsEmail({}, { message: 'Please use Email Format' })
	@IsNotEmpty({ message: 'Department Email is required' })
	deptEmail: string;

	@Column({ type: 'text', nullable: false, width: 20 })
	@IsNotEmpty({ message: 'Department phone is required' })
	deptPhone: string;

	@Column({ type: 'text', nullable: false })
	@IsNotEmpty({ message: 'Department managers name is required' })
	deptManager: string;

	//One Department is in one room
	@OneToOne(() => Office)
	@JoinColumn({ name: 'roomID' })
	public roomID!: Office;

	//One Department is in one room
	@OneToOne(() => Faculty, { eager: true })
	@JoinColumn({ name: 'deptHeadID' })
	public deptHeadID!: Faculty | FacultyPartTime | FacultyFullTime;
	// This sets an association between Departments and FacultyDepartments
	// set to cascade so that you can create a faculty and fill in the join table with one query
	@OneToMany(() => FacultyDepartment, (FacultyDepartment) => FacultyDepartment.fID,)
	public Faculties!: FacultyDepartment[];

	//One Department has many Majors
	@OneToMany(() => Major, (major) => major.department, { cascade: true })
	public majors!: Major[];

	//One Department has many Minors
	@OneToMany(() => Minor, (minor) => minor.department, { cascade: true })
	public minors!: Minor[];

	//One Department has many courses
	@OneToMany(() => Course, (course) => course.deptID)
	public courses!: Course[];
}
