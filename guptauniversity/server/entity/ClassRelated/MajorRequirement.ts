import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from './Course';
import { Major } from './Major';

@Entity()
export class MajorRequirement extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, MajorRequirement);
	}
	@PrimaryGeneratedColumn()
	public reqID: number

	//Relationship to Course
	@ManyToOne(() => Course, (course) => course.majorrequirement, { eager: true })
	@JoinColumn({ name: 'courseID' })
	public courseID!: Course;

	//Relationship to Major
	@ManyToOne(() => Major, (major) => major.majorrequirement, { eager: true })
	@JoinColumn({ name: 'majorID' })
	public majorID!: Major;

	@Column()
	gradeRequired: string;
}
