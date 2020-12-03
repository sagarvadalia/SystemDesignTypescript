import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Faculty } from '../Users/Faculty';
import { Student } from '../Users/Student';

@Entity()
export class Advisor extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Advisor);
	}
	// This is to for setting up the jointable entity between students and faculty

	@ManyToOne(() => Faculty, (faculty) => faculty.advisors, { primary: true, eager: true })
	@JoinColumn({ name: 'fID' })
	public fID!: Faculty;

	@ManyToOne(() => Student, (student) => student.advisors, { primary: true })
	@JoinColumn({ name: 'sID' })
	public sID!: Student;

	@Column({ type: 'date' })
	@IsNotEmpty({ message: 'Date assigned must be provided' })
	dateAssigned: Date;
}
