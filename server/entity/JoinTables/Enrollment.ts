import { IsNotEmpty } from 'class-validator';
import { StudentController } from 'server/controller/Users/StudentController';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { Class } from '../ClassRelated/Class';
import { StudentHistory } from '../StudentHistory';
import { Student } from '../Users/Student';

@Entity()
export class Enrollment extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Enrollment);
	}

	@ManyToOne(() => Class, (classes) => classes.enrollment, { primary: true })
	@JoinColumn({ name: 'classCRN' })
	public class!: Class;

	@ManyToOne(() => Student, (student) => student.userID, { primary: true })
	@JoinColumn({ name: 'sID'})
	public student!: Student;

	@Column({ type: 'date', nullable: false })
	@IsNotEmpty({ message: 'enrollDate must be provided ' })
	enrollDate: Date;

	@Column({ type: 'text', nullable: false })
	@IsNotEmpty({ message: 'grade must be provided' })
	grade: string;
}
