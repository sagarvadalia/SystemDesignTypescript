import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Department } from '../Locations/Department';

@Entity()
export class Major extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Major);
	}

	@PrimaryColumn()
	majorID: number;

	@Column({ type: 'text', nullable: false })
	@IsNotEmpty({ message: 'Name must be provided' })
	majorName: string;

	// One Department has many majors
	@ManyToOne(() => Department, (department) => department.majors, {})
	@JoinColumn({ name: 'deptID' })
	public departments!: Department;
}
