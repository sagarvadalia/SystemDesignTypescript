import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Enrollment } from './Enrollment';

@Entity()
export class Attendance extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Attendance);
	}

	@Column({ type: 'boolean', nullable: false })
	@IsNotEmpty({ message: 'isPresent must be provided ' })
	isPresent: boolean;

	@Column({ type: 'date', nullable: false })
	@IsNotEmpty({ message: 'date must be provided' })
	date: Date;

	// One enrollment has many attendances
	// this grabs the classCRN
	@ManyToOne(() => Enrollment, (enrollment) => enrollment.classCRN, { primary: true })
	@JoinColumn([
		{ name: 'classCRN', referencedColumnName: 'classCRN' },
		{ name: 'sID', referencedColumnName: 'sID' },
	])
	public attendance!: Enrollment;
}
