import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { TimeSlotDay } from '../JoinTables/TimeSlotDay';
import { TimeSlot } from './TimeSlot';

@Entity()
export class Day extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Day);
	}

	@PrimaryColumn({ type: 'text', nullable: false })
	nameOfDay: string;

	@OneToMany(() => TimeSlotDay, (timeSlotDay) => timeSlotDay.nameOfDay, {cascade: true})
	public timeSlotDay!: TimeSlotDay[];

	
}
