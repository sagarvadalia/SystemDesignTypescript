import { Student } from '../Users/Student';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Hold } from '../StudentRelated/Hold';

@Entity()
export class StudentHold extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, StudentHold);
	}

	@ManyToOne(() => Student, (student) => student.studentHolds, { eager: true })
	@JoinColumn({ name: 'sID' })
	public sID: Student;

	@ManyToOne(() => Hold, (hold) => hold.studentHolds, { eager: true })
	@JoinColumn({ name: 'holdID' })
	public holdID: Hold;

	@PrimaryGeneratedColumn()
	public studentHoldID: number;
}
