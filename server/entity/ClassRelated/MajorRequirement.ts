import { BaseEntity, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Course } from './Course';
import { Major } from './Major';

@Entity()
export class MajorRequirement extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, MajorRequirement);
	}
	//Relationship to Course
	@ManyToOne(() => Course, (course) => course.majorrequirement, { primary: true })
	@JoinColumn({ name: 'courseID' })
	public course!: Course;

	//Relationship to Major
	@ManyToOne(() => Major, (major) => major.majorrequirement, { primary: true })
	@JoinColumn({ name: 'majorID' })
	public major!: Major;

	@Column()
	gradeRequired: string;
}
