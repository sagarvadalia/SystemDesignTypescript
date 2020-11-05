import { Student } from '../Users/Student';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Hold } from '../StudentRelated/Hold';

@Entity()
export class StudentHold extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, StudentHold);
	}
	@ManyToOne(() => Student, (student) => student.studentHolds, { primary: true })
	@JoinColumn({ name: 'sID' })
	public students: Student;
	@ManyToOne(() => Hold, (hold) => hold.studentHolds, { primary: true })
	@JoinColumn({ name: 'holdID' })
	public holds: Hold;
}
