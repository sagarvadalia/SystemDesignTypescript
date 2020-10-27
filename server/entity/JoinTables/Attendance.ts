import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Enrollment } from './Enrollment';

@Entity()
export class Attendance extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Attendance);
	}

	@PrimaryColumn()
	classCRN: number;

	@ManyToOne(() => Enrollment, (enrollment) => enrollment.class.classCRN, { primary: true })
	@JoinColumn({ name: 'classCRN' })
	public enrollment!: Enrollment;

	@ManyToOne(() => Enrollment, (enrollment) => enrollment.student.userID, { primary: true })
	@JoinColumn({ name: 'sid' })
	public enrollments!: Enrollment;

	@Column({ type: 'boolean', nullable: false })
	@IsNotEmpty({ message: 'isPresent must be provided ' })
	isPresent: boolean;

	@Column({ type: 'text', nullable: false })
	@IsNotEmpty({ message: 'date must be provided' })
	date: string;
}
