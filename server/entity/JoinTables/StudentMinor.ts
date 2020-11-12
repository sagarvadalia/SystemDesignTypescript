import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Minor } from '../ClassRelated/Minor';
import { Student } from '../Users/Student';

@Entity()
export class StudentMinor extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, StudentMinor);
	}

	@ManyToOne(() => Minor, (minors) => minors.minorID, { primary: true })
	@JoinColumn({ name: 'minorID', referencedColumnName: 'minorID' })
	public minorID!: Minor;

	@ManyToOne(() => Student, (students) => students.userID, { primary: true })
	@JoinColumn({ name: 'sID' })
	public sID!: Student;

	@Column({ nullable: false, type: 'date' })
	@IsNotEmpty({ message: 'Date Declared must be provided' })
	dateDeclared: Date;
}
