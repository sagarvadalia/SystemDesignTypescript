import { IsNotEmpty } from 'class-validator';
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { StudentMinor } from '../JoinTables/StudentMinor';
import { TimeSlotDay } from '../JoinTables/TimeSlotDay';
import { Department } from '../Locations/Department';
import { MinorRequirement } from './MinorRequirement';

@Entity()
export class Minor extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Minor);
	}

	@PrimaryGeneratedColumn()
	minorID: number;

	@Column({ type: 'text', nullable: false })
	@IsNotEmpty({ message: 'Name must be provided' })
	minorName: string;

	@OneToMany(() => StudentMinor, (studentMinors) => studentMinors.minorID, { cascade: true })
	public studentMinors!: TimeSlotDay[];

	//Relationship to MinorRequirement
	@OneToMany(() => MinorRequirement, (minorrequirement) => minorrequirement.minor)
	public minorrequirement!: MinorRequirement;

	// One Department has many minors
	@ManyToOne(() => Department, (department) => department.minors, {})
	@JoinColumn({ name: 'deptID' })
	public departments!: Department;
}
