import { IsEmail, IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { FacultyDepartment } from '../JoinTables/FacultyDepartment';

@Entity()
export class Department extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Department);
	}
	// This sets an association between Departments and FacultyDepartments
	// set to cascade so that you can create a faculty and fill in the join table with one query
	@OneToMany(() => FacultyDepartment, (FacultyDepartment) => FacultyDepartment.faculty, { cascade: true })
	public FacultyDepartment!: FacultyDepartment[];
	@PrimaryColumn({ type: 'integer' })
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
	@CreateDateColumn()
	createdAt: Date;
	@UpdateDateColumn()
	updatedAt: Date;
}
