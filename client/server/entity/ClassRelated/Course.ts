import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Department } from '../Locations/Department';
import { Class } from './Class';
import { MajorRequirement } from './MajorRequirement';
import { MinorRequirement } from './MinorRequirement';

@Entity()
export class Course extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Course);
	}
	@PrimaryGeneratedColumn({ type: 'integer' })
	courseID: number;

	@Column({ type: 'text', nullable: false, width: 50, unique: true })
	@IsNotEmpty({ message: 'Course name is required' })
	courseName: string;

	@Column()
	@IsNotEmpty({ message: 'Course description is required' })
	courseDesc: string;

	@Column()
	@IsNotEmpty({ message: 'Number of credits is required' })
	numOfCredits: number;

	//relationship to department
	@ManyToOne(() => Department, (department: Department) => department.courses, { eager: true })
	@JoinColumn({ name: 'deptID' })
	public deptID!: Department;

	//Relationship to MajorRequirement
	@OneToMany(() => MajorRequirement, (majorrequirement) => majorrequirement.courseID)
	public majorrequirement!: MajorRequirement[];

	//Relationship to MinorRequirement
	@OneToMany(() => MinorRequirement, (minorrequirement) => minorrequirement.courseID)
	public minorrequirement!: MinorRequirement[];

	//One Course has many Classes
	@OneToMany(() => Class, (classes) => classes.courseID)
	public classes!: Class[];
}
