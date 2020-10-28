import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { TimeSlotPeriod } from '../JoinTables/TimeslotPeriod';

@Entity()
export class Period extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Period);
	}
	// This sets an association between Period and Timeslot

	@OneToMany(() => TimeSlotPeriod, (timeSlotPeriod) => timeSlotPeriod.period, { cascade: true })
	public timeSlotPeriod: TimeSlotPeriod[];

	@PrimaryColumn({ type: 'integer' })
	periodID: number;

	@Column({ type: 'text', nullable: false, width: 10, unique: false })
	@IsNotEmpty({ message: 'Start Time is required' })
	startTime: string;

	@Column({ type: 'text', nullable: false, width: 10, unique: false })
	@IsNotEmpty({ message: 'End Time is required' })
	endTime: string;
	@CreateDateColumn()
	createdAt: Date;
	@UpdateDateColumn()
	updatedAt: Date;
}
