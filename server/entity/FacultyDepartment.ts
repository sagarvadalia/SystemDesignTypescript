import { IsNotEmpty } from 'class-validator';
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Faculty } from './Users/Faculty';
import { Student } from './Users/Student';
import { Department } from './Locations/Department';

@Entity()
export class FacultyDepartment extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, FacultyDepartment);
	}
	// This is to for setting up the jointable entity between Departments and faculty

	@ManyToOne(() => Faculty, (faculty) => faculty.FacultyDepartment, { primary: true })
	@JoinColumn({ name: 'fid' })
	public faculty!: Faculty;
	@ManyToOne(() => Department, (department) => department.FacultyDepartment, { primary: true })
	@JoinColumn({ name: 'did' })
	public department!: Department;

	@Column({ type: 'text' })
	percentOfTime: string;
	@Column({ type: 'date' })
	dateAppointed: Date;
	@CreateDateColumn()
	createdAt: Date;
	@UpdateDateColumn()
	updatedAt: Date;
}
