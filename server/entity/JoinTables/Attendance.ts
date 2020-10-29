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

	@Column({ type: 'boolean', nullable: false })
	@IsNotEmpty({ message: 'isPresent must be provided ' })
	isPresent: boolean;

	@Column({ type: 'date', nullable: false })
	@IsNotEmpty({ message: 'date must be provided' })
	date: Date;

	// One enrollment has many attendances
	// this grabs the classCRN
	@ManyToOne(() => Enrollment, (enrollment) => enrollment.class.classCRN, { primary: true })
	@JoinColumn({ name: 'classCRN', referencedColumnName: 'classCRN' })
	public enrollment!: Enrollment;
	// This grabs the SID
	@ManyToOne(() => Enrollment, (enrollment) => enrollment.student.userID, { primary: true })
	@JoinColumn({ name: 'sid', referencedColumnName: 'sid' })
	public enrollments!: Enrollment;
}
