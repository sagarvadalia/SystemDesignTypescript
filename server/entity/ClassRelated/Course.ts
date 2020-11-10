import { IsNotEmpty } from 'class-validator';
import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryColumn,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Department } from '../Locations/Department';
import { Class } from './Class';
import { MajorRequirement } from './MajorRequirement';
import { MinorRequirement } from './MinorRequirement';
import { Prerequisite } from './Prerequisite';

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
	@ManyToOne(() => Department, (department: Department) => department.courses)
	@JoinColumn({ name: 'deptID' })
	public department!: Department;

	//Relationship to MajorRequirement
	@OneToMany(() => MajorRequirement, (majorrequirement) => majorrequirement.course)
	public majorrequirement!: MajorRequirement;

	//Relationship to MinorRequirement
	@OneToMany(() => MinorRequirement, (minorrequirement) => minorrequirement.course)
	public minorrequirement!: MinorRequirement;

	//One Course has many Classes
	@OneToMany(() => Class, (classes) => classes.courses)
	public classes!: Class[];
}
