import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryColumn,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import { Course } from './Course';

@Entity()
export class Prerequisite extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Prerequisite);
	}
	// Prerequisite grabs course id and prereqID from a many to one assoc. with Courses
	@ManyToOne(() => Course, (course: Course) => course, { primary: true })
	@JoinColumn({ name: 'courseID' })
	public course!: Course;
	@ManyToOne(() => Course, (course: Course) => course, { primary: true })
	@JoinColumn({ name: 'prereqID' })
	public prereq!: Course;

	@Column({ type: 'text', nullable: false })
	gradeRequired: string;

	@Column()
	yearCreated: number;
	@CreateDateColumn()
	createdAt: Date;
	@UpdateDateColumn()
	updatedAt: Date;
}
