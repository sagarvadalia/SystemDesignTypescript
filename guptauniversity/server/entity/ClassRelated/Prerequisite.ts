import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
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
	yearCreated: string;

	@Column()
	prereqID: number;

	@PrimaryGeneratedColumn()
	ID: number;


	// One Course has many Prerequisites
	@ManyToOne(() => Course, (course: Course) => course.prereqs, { cascade:true})
	@JoinColumn({ name: 'courseID' })
	public courseID!: Course;

}
