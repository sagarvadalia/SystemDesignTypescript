import { IsNotEmpty } from 'class-validator';
import { Col } from 'sequelize/types/lib/utils';
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

	@Column({ nullable: true, primary: true })
	sID: number;
	// One student History belongs to one enrollment
	@OneToOne(() => Enrollment, (enrollment) => enrollment.class, {
		primary: true,
		cascade: true,
		eager: true,
	})
	@JoinColumn([{ name: 'sid' })
	classCRN!: number;
}
