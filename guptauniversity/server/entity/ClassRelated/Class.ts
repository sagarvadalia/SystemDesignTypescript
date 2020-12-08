import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Enrollment } from '../JoinTables/Enrollment';
import { Lecture } from '../Locations/Lecture';
import { Semester } from '../TimeRelated/Semester';
import { TimeSlot } from '../TimeRelated/TimeSlot';
import { Faculty } from '../Users/Faculty';
import { Course } from './Course';

// Need to handle the association with course
@Entity()
export class Class extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Class);
	}
	@PrimaryGeneratedColumn()
	classCRN: number;

	@Column({ type: 'text', nullable: false })
	@IsNotEmpty({ message: 'section is required' })
	classSection: number;

	@Column({ type: 'integer', nullable: false })
	numOfSeats: number;

	// One Class has many enrollments
	@OneToMany(() => Enrollment, (enrollment) => enrollment.classCRN, { cascade: true })
	public enrollment!: Enrollment[];

	//Many Classes belong to one Course
	@ManyToOne(() => Course, (course) => course.classes, {eager: true})
	@JoinColumn({ name: 'courseID' })
	public courseID!: Course;

	//Many classes belong to one faculty
	@ManyToOne(() => Faculty, {eager: true})
	@JoinColumn({ name: 'fID' })
	public fID!: Faculty;

	//Many classes belong to one timeslot
	@ManyToOne(() => TimeSlot, (timeslot) => timeslot.classes, {eager: true})
	@JoinColumn({ name: 'slotID' })
	public slotID!: TimeSlot;

	//Many Classes belong to one Room
	@ManyToOne(() => Lecture, (lecture) => lecture.classes, {eager:true})
	@JoinColumn({ name: 'roomID' })
	public roomID!: Lecture;

	//Many Classes belong to one semester
	@ManyToOne(() => Semester, (semester) => semester.classes, {eager: true})
	@JoinColumn({ name: 'semesterID' })
	public semesterID!: Semester;
}
