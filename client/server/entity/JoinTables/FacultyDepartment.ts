import { BaseEntity, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Department } from '../Locations/Department';
import { Faculty } from '../Users/Faculty';

@Entity()
export class FacultyDepartment extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, FacultyDepartment);
	}

	@Column({ type: 'text' })
	percentOfTime: string;

	@Column({ type: 'date' })
	dateAppointed: Date;

	//One Faculty belongs to many departments
	@ManyToOne(() => Faculty, (faculty) => faculty.FacultyDepartment, { primary: true, eager: true })
	@JoinColumn({ name: 'fID' })
	public fID!: Faculty;

	//One Department belongs to many faculty
	@ManyToOne(() => Department, (department) => department.Faculties, { eager: true, primary: true })
	@JoinColumn({ name: 'deptID' })
	public deptID!: Department;
}
