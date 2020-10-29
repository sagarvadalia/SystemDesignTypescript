import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { Enrollment } from '../JoinTables/Enrollment';
import { Room } from '../Locations/Room';
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
	@PrimaryColumn()
	classCRN: number;

	@Column({ type: 'text', nullable: false })
	@IsNotEmpty({ message: 'section is required' })
	classSection: string;

	@Column({ type: 'integer', nullable: false })
	numOfSeats: number;

	// One Class has many enrollments
	@OneToMany(() => Enrollment, (enrollment) => enrollment.class, { cascade: true, eager: true })
	public enrollment!: Enrollment[];

	//Many Classes belong to one Course
	@ManyToOne(() => Course, (course) => course.classes)
	@JoinColumn({ name: 'courseID' })
	public courses!: Course;

	//One class has one faculty
	@OneToOne(() => Faculty)
	@JoinColumn({ name: 'fid' })
	public faculty!: Faculty;

	//Many classes belong to one timeslot
	@ManyToOne(() => TimeSlot, (timeslot) => timeslot.classes)
	@JoinColumn({ name: 'slotID' })
	public timeslots!: TimeSlot;

	//Many Classes belong to one Room
	@ManyToOne(() => Room, (room) => room.classes)
	@JoinColumn({ name: 'roomID' })
	public room!: Room;

	//Many Classes belong to one semester
	@ManyToOne(() => Semester, (semester) => semester.classes)
	@JoinColumn({ name: 'semesterID' })
	public semester!: Semester;
}
