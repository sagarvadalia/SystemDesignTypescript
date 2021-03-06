import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TimeSlot } from './TimeSlot';

@Entity()
export class Period extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Period);
	}

	@PrimaryGeneratedColumn({ type: 'integer' })
	periodID: number;

	@Column({ type: 'text', nullable: false, width: 10, unique: false })
	@IsNotEmpty({ message: 'Start Time is required' })
	startTime: string;

	@Column({ type: 'text', nullable: false, width: 10, unique: false })
	@IsNotEmpty({ message: 'End Time is required' })
	endTime: string;

	@OneToMany(() => TimeSlot, (timeslot) => timeslot.periodID, { cascade: true })
	public timeslots!: TimeSlot;
}