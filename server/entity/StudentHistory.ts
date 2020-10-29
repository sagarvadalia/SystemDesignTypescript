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

	

	@Column({ type: 'text', nullable: false })
	@IsNotEmpty({ message: 'grade received must be provided' })
	gradeReceived: string;

	@Column({ type: 'integer', nullable: false })
	@IsNotEmpty({ message: 'semester ID must be provided ' })
	semesterID: number;
	
	// One student History belongs to one enrollment
	@OneToOne(() => Enrollment, (enrollment) => enrollment.student.userID, { primary: true })
	@JoinColumn({name: 'sID', referencedColumnName: 'sID'})
	public sID!: number;

	@OneToOne(() => Enrollment, (enrollment) => enrollment.class.classCRN, { primary: true })
	@JoinColumn({name: 'classCRN', referencedColumnName: 'classCRN'})
	public classCRN!: number;
	
}
