import { Class } from '../ClassRelated/Class';
import { BaseEntity, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { TimeSlotPeriod } from '../JoinTables/TimeslotPeriod';

@Entity()
export class TimeSlot extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, TimeSlot);
	}
	// This sets an association between Period and Timeslot

	@OneToMany(() => TimeSlotPeriod, (timeSlotPeriod) => timeSlotPeriod.timeslot, { cascade: true })
	public timeSlotPeriod: TimeSlotPeriod[];

	//Relationship to Class
	@OneToMany(() => Class, (classes) => classes.faculty, { cascade: true })
	public classes!: Class[];

	@PrimaryColumn()
	slotID: number;
}
