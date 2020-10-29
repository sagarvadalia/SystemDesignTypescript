import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Class } from '../ClassRelated/Class';
import { Student } from '../Users/Student';

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

	@ManyToOne(() => Class, (classes) => classes.enrollment, { primary: true })
	@JoinColumn({ name: 'classCRN' })
	public class!: Class;

	@ManyToOne(() => Student, (student) => student.enrollment, { primary: true })
	@JoinColumn({ name: 'studentID' })
	public student!: Student;
}
