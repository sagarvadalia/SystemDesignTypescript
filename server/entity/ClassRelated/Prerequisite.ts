import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn, ManyToOne
} from 'typeorm';
import { Course } from './Course';

@Entity()
export class Prerequisite extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Prerequisite);
	}

	@Column({ type: 'text', nullable: false })
	gradeRequired: string;

	@Column()
	yearCreated: number;

	// One Course has many Prerequisites
	@ManyToOne(() => Course, (course: Course) => course, { primary: true })
	@JoinColumn({ name: 'courseID' })
	public course!: Course;

	//One Prerequisite has many courses
	@ManyToOne(() => Course, (course: Course) => course, { primary: true })
	@JoinColumn({ name: 'prereqID' })
	public prereq!: Course;
}
