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
} from 'typeorm';
import { Faculty } from '../Users/Faculty';
import { Student } from '../Users/Student';

@Entity()
export class Advisor extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Advisor);
	}
	// This is to for setting up the jointable entity between students and faculty

	@ManyToOne(() => Faculty, (faculty) => faculty.advisors, { primary: true })
	@JoinColumn({ name: 'fid' })
	public faculty!: Faculty;
	@ManyToOne(() => Student, (student) => student.advisors, { primary: true })
	@JoinColumn({ name: 'sid' })
	public student!: Student;

	@Column({ type: 'text', nullable: false })
	@IsNotEmpty({ message: 'Date assigned must be provided' })
	dateAssigned: string;
	@CreateDateColumn()
	createdAt: Date;
	@UpdateDateColumn()
	updatedAt: Date;
}
