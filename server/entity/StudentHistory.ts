import { IsNotEmpty } from 'class-validator';
import { Col } from 'sequelize/types/lib/utils';
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
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

	// One student History belongs to one enrollment
	@OneToOne(() => Enrollment, (enrollment) => enrollment.classCRN, {
		primary: true,
	})
	@JoinColumn([
		{ name: 'classCRN', referencedColumnName: 'classCRN' },
		{ name: 'sID', referencedColumnName: 'sID' },
	])
	public historyClass: Enrollment;
}
