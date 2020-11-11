import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StudentMinor } from '../JoinTables/StudentMinor';

import { Department } from '../Locations/Department';
import { MinorRequirement } from './MinorRequirement';

@Entity()
export class Minor extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Minor);
	}

	@PrimaryGeneratedColumn()
	minorID: number;

	@Column({ type: 'text', nullable: false })
	@IsNotEmpty({ message: 'Name must be provided' })
	minorName: string;

	@OneToMany(() => StudentMinor, (studentMinors) => studentMinors.minorID, { cascade: true })
	public studentMinors!: StudentMinor[];

	//Relationship to MinorRequirement
	@OneToMany(() => MinorRequirement, (minorrequirement) => minorrequirement.minorID)
	public minorrequirement!: MinorRequirement[];

	// One Department has many minors
	@ManyToOne(() => Department, (department) => department.minors, {})
	@JoinColumn({ name: 'deptID' })
	public deptID!: Department;
}
