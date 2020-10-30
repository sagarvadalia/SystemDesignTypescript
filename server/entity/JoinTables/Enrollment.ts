import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Class } from '../ClassRelated/Class';
import { StudentHistory } from '../StudentHistory';
import { Student } from '../Users/Student';
import { Attendance } from './Attendance';

@Entity()
export class Enrollment extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Enrollment);
	}

	@Column({ type: 'date', nullable: false })
	@IsNotEmpty({ message: 'enrollDate must be provided ' })
	enrollDate: Date;

	@Column({ type: 'text', nullable: false })
	@IsNotEmpty({ message: 'grade must be provided' })
	grade: string;

	@ManyToOne(() => Class, (classes: Class) => classes.enrollment, { primary: true })
	@JoinColumn({ name: 'classCRN' })
	public class!: Class;

	@ManyToOne(() => Student, (student: Student) => student.enrollment, { primary: true })
	@JoinColumn({ name: 'sID' })
	public student!: Student;

	@OneToMany(() => Attendance, (attendance: Attendance) => attendance.classCRN)
	attendances: Attendance[];
}
