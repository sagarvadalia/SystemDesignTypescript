import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Major } from '../ClassRelated/Major';
import { Student } from '../Users/Student';

@Entity()
export class StudentMajor extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, StudentMajor);
	}

	@ManyToOne(() => Major, (majors) => majors.majorID, { primary: true })
	@JoinColumn({ name: 'majorID', referencedColumnName: 'majorID' })
	public majorID!: number;

	@ManyToOne(() => Student, (students) => students.userID, { primary: true })
	@JoinColumn({ name: 'sID' })
	public sID!: number;

	@Column({ nullable: false, type: 'text' })
	@IsNotEmpty({ message: 'Date Declared must be provided' })
	dateDeclared: string;
}
