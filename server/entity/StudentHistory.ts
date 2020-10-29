import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Enrollment } from './JoinTables/Enrollment';

@Entity()
export class StudentHistory extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, StudentHistory);
	}

	@Column({ type: 'text', nullable: false })
	@IsNotEmpty({ message: 'grade received must be provided' })
	gradeReceived: string;

	@Column({ type: 'integer', nullable: false })
	@IsNotEmpty({ message: 'semester ID must be provided ' })
	semesterID: number;

	// One student History belongs to one enrollment
	@OneToOne(() => Enrollment, (enrollment) => enrollment.student, { primary: true })
	@JoinColumn()
	public student!: number;

	@OneToOne(() => Enrollment, (enrollment) => enrollment.class, { primary: true })
	@JoinColumn()
	public class!: number;
}
