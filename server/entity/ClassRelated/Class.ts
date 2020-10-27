import { IsNotEmpty } from 'class-validator';
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryColumn,
	UpdateDateColumn,
	OneToMany,
} from 'typeorm';
import { Faculty } from '../Users/Faculty';
import { TimeSlot } from '../TimeRelated/TimeSlot';
import { Course } from './Course';
import { Room } from '../Locations/Room';
import { Semester } from '../TimeRelated/Semester';
import { Enrollment } from '../JoinTables/Enrollment';

// Need to handle the association with course
@Entity()
export class Class extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Class);
	}

	@OneToMany(() => Enrollment, (enrollment) => enrollment.class, { cascade: true })
	public enrollment!: Enrollment;
	@PrimaryColumn()
	classCRN: number;

	//FK from Course
	@ManyToOne(() => Course, (course) => course.classes)
	@JoinColumn({ name: 'courseID' })
	public courses!: Course;

	//FK from Faculty
	@OneToOne(() => Faculty)
	@JoinColumn()
	public faculty!: Faculty;

	@Column({ type: 'text', nullable: false })
	@IsNotEmpty({ message: 'section is required' })
	classSection: string;

	//FK from TimeSlot
	@ManyToOne(() => TimeSlot, (timeslot) => timeslot.classes)
	@JoinColumn({ name: 'slotID' })
	public timeslots!: TimeSlot;

	//FK from Room
	@ManyToOne(() => Room, (room) => room.classes)
	@JoinColumn({ name: 'roomID' })
	public room!: Room;

	@Column({ type: 'integer', nullable: false })
	numOfSeats: number;

	//FK from Semester
	@ManyToOne(() => Semester, (semester) => semester.classes)
	@JoinColumn({ name: 'semesterID' })
	public semester!: Semester;

	@CreateDateColumn()
	createdAt: Date;
	@UpdateDateColumn()
	updatedAt: Date;
}
