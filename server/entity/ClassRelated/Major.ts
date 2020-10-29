import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Department } from '../Locations/Department';
import { MajorRequirement } from './MajorRequirement';

@Entity()
export class Major extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Major);
	}

	@PrimaryColumn()
	majorID: number;

	@ManyToOne(() => Department, (department) => department.majors, {})
	@JoinColumn({ name: 'deptID' })
	public departments!: Department;

	@Column({ type: 'text', nullable: false })
	@IsNotEmpty({ message: 'Name must be provided' })
	majorName: string;

	//Relationship to MajorRequirement
	@OneToMany(() => MajorRequirement, (majorrequirement) => majorrequirement.major)
	public majorrequirement!: MajorRequirement;
}
