import { BaseEntity, CreateDateColumn, Entity, JoinColumn, ManyToOne, UpdateDateColumn } from 'typeorm';
import { Period } from '../TimeRelated/Period';
import { TimeSlot } from '../TimeRelated/TimeSlot';

@Entity()
export class TimeSlotPeriod extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, TimeSlotPeriod);
	}

	// Join table between Timeslot and period
	@ManyToOne(() => TimeSlot, (timeslot) => timeslot.timeSlotPeriod, { primary: true })
	@JoinColumn({ name: 'slotID' })
	public timeslot!: TimeSlot;
	@ManyToOne(() => Period, (period) => period.timeSlotPeriod, { primary: true })
	@JoinColumn({ name: 'periodID' })
	public period!: Period;
	@CreateDateColumn()
	createdAt: Date;
	@UpdateDateColumn()
	updatedAt: Date;
}
