import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Department } from '../Locations/Department';
import { MajorRequirement } from './MajorRequirement';

@Entity()
export class Major extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Major);
	}

	@PrimaryGeneratedColumn()
	majorID: number;

	@Column({ type: 'text', nullable: false })
	@IsNotEmpty({ message: 'Name must be provided' })
	majorName: string;

	//Relationship to MajorRequirement
	@OneToMany(() => MajorRequirement, (majorrequirement) => majorrequirement.majorID)
	public majorrequirement!: MajorRequirement[];

	// One Department has many majors
	@ManyToOne(() => Department, (department) => department.majors, {eager:true})
	@JoinColumn({ name: 'deptID' })
	public department!: Department;
}
