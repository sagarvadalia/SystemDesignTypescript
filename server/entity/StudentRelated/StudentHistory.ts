import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Enrollment } from '../JoinTables/Enrollment';

@Entity()
export class StudentHistory extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, StudentHistory);
	}

	@Column({ type: 'text', nullable: false })
	@IsNotEmpty({ message: 'grade received must be provided' })
	gradeReceived: string;

	// One student History belongs to one enrollment
	@OneToOne(() => Enrollment, (enrollment) => enrollment.enrollmentID, { primary: true })
	@JoinColumn({ name: 'enrollmentID', referencedColumnName: 'enrollmentID' })
	public enrollmentID!: Enrollment;
}
