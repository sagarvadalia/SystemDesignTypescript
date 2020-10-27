import { IsNotEmpty } from 'class-validator';
import { ENOPROTOOPT } from 'constants';
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Enrollment } from './JoinTables/Enrollment';

@Entity()
export class StudentHistory extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, StudentHistory);
	}

	@OneToOne(() => Enrollment, (enrollment) => enrollment.student.userID, { primary: true })
	@PrimaryColumn()
	public enrollment!: number;

	@OneToOne(() => Enrollment, (enrollment) => enrollment.class.classCRN, { primary: true })
	@PrimaryColumn()
	public enrollments!: number;

	@Column({ type: 'text', nullable: false })
	@IsNotEmpty({ message: 'grade received must be provided' })
	gradeReceived: string;

	@Column({ type: 'integer', nullable: false })
	@IsNotEmpty({ message: 'semester ID must be provided ' })
	semesterID: number;
	@CreateDateColumn()
	createdAt: Date;
	@UpdateDateColumn()
	updatedAt: Date;
}
