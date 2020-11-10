import { BaseEntity, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Day } from '../TimeRelated/Day';
import { TimeSlot } from '../TimeRelated/TimeSlot';
import { Period } from '../TimeRelated/Period';

@Entity()
export class DayAndPeriod extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, DayAndPeriod);
	}

	@ManyToOne(() => TimeSlot, (timeSlots) => timeSlots.slotID, { primary: true })
	@JoinColumn({ name: 'slotID', referencedColumnName: 'slotID' })
	public slotID!: number;

	@ManyToOne(() => Day, (days) => days.nameOfDay, { primary: true })
	@JoinColumn({ name: 'nameOfDay', referencedColumnName: 'nameOfDay' })
	public nameOfDay!: Day;

	@ManyToOne(() => Period, (period) => period.periodID, { primary: true })
	@JoinColumn({ name: 'periodID', referencedColumnName: 'periodID' })
	public periodID!: Period;
}
