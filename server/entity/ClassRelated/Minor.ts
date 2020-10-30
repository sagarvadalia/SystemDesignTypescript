import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Department } from '../Locations/Department';
import { MinorRequirement } from './MinorRequirement';

@Entity()
export class Minor extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Minor);
	}

	@PrimaryColumn()
	minorID: number;

	@Column({ type: 'text', nullable: false })
	@IsNotEmpty({ message: 'Name must be provided' })
	minorName: string;

	//Relationship to MinorRequirement
	@OneToMany(() => MinorRequirement, (minorrequirement) => minorrequirement.minor)
	public minorrequirement!: MinorRequirement;

	// One Department has many minors
	@ManyToOne(() => Department, (department) => department.minors, {})
	@JoinColumn({ name: 'deptID' })
	public departments!: Department;
}
