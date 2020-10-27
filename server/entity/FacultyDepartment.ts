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
import { Faculty } from '../entity/Faculty';
import { Student } from '../entity/Student';
import { Department } from './Department';

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
