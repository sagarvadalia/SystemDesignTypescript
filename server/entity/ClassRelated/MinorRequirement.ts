import { BaseEntity, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Course } from './Course';
import { Minor } from './Minor';

@Entity()
export class MinorRequirement extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, MinorRequirement);
	}
	//Relationship to Course
	@ManyToOne(() => Course, (course) => course.minorrequirement, { primary: true })
	@JoinColumn({ name: 'courseID' })
	public course!: Course;

	//Relationship to Minor
	@ManyToOne(() => Minor, (minor) => minor.minorrequirement, { primary: true })
	@JoinColumn({ name: 'minorID' })
	public minor!: Minor;

	@Column()
	gradeRequired: string;
}
