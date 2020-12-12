import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Class } from '../ClassRelated/Class';
import { Student } from '../Users/Student';
import { Attendance } from './Attendance';

@Entity()
export class Enrollment extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Enrollment);
	}
	@PrimaryGeneratedColumn()
	enrollmentID: number;

	@Column({ type: 'date', nullable: false })
	@IsNotEmpty({ message: 'enrollDate must be provided ' })
	enrollDate: Date;

	@Column({ type: 'text', nullable: true })
	midtermGrade: string;

	@Column({ type: 'text', nullable: true })
	finalGrade: string;

	@ManyToOne(() => Class, (classes: Class) => classes.enrollment, { eager: true })
	@JoinColumn({ name: 'classCRN', referencedColumnName: 'classCRN' })
	public classCRN!: Class;

	@ManyToOne(() => Student, (student: Student) => student.enrollment, { eager: true })
	@JoinColumn({ name: 'sID' })
	public sID!: Student;

// One enrollment has many attendances
	// this grabs the classCRN
	@OneToMany(() => Attendance, (attendance) => attendance.enrollmentID, {eager:true})
	public attendances!: Attendance[];


}
