import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { StudentMinor } from '../JoinTables/StudentMinor';
import { TimeSlotDay } from '../JoinTables/TimeSlotDay';
import { Department } from '../Locations/Department';

@Entity()
export class Minor extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Minor);
	}

	@PrimaryColumn()
	minorID: number;

	

	@Column({ type: 'text', nullable: false })
	@IsNotEmpty({ message: 'Name must be provided' })
	minorName: string;

	@ManyToOne(() => Department, (department) => department.minors, {cascade: true})
	@JoinColumn({ name: 'deptID' })
	public departments!: Department;

	@OneToMany(() => StudentMinor, (studentMinors) => studentMinors.minorID, {cascade: true})
	public studentMinors!: TimeSlotDay[];
}