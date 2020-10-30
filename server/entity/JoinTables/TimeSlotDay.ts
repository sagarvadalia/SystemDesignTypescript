import { BaseEntity, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Day } from '../TimeRelated/Day';
import { TimeSlot } from '../TimeRelated/TimeSlot';

@Entity()
export class TimeSlotDay extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, TimeSlotDay);
	}

	@ManyToOne(() => Day, (days) => days.nameOfDay, { primary: true })
	@JoinColumn({ name: 'nameOfDay', referencedColumnName: 'nameOfDay' })
	public nameOfDay!: string;

	@ManyToOne(() => TimeSlot, (timeSlots) => timeSlots.slotID, { primary: true })
	@JoinColumn({ name: 'slotID', referencedColumnName: 'slotID' })
	public slotID!: number;
}
