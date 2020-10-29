import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
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
	@PrimaryColumn({ type: 'integer' })
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
