import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { Faculty } from '../entity/Faculty';
import { Student } from '../entity/Student';

@Entity()
export class Advisor extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Advisor);
	}
	// This is to for setting up the jointable entity between students and faculty

	@ManyToOne(() => Faculty, (faculty) => faculty.advisors, { primary: true })
	public faculty!: Faculty;

	@ManyToOne(() => Student, (student) => student.advisors, { primary: true })
	public student!: Student;

	@Column({ type: 'text', nullable: false })
	@IsNotEmpty({ message: 'Date assigned must be provided' })
	dateAssigned: string;
}
