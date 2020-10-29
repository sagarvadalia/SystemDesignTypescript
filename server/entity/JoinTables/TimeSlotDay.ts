import { IsNotEmpty } from 'class-validator';
import { StudentController } from 'server/controller/Users/StudentController';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { Class } from '../ClassRelated/Class';
import { StudentHistory } from '../StudentHistory';
import { Day } from '../TimeRelated/Day';
import { TimeSlot } from '../TimeRelated/TimeSlot';
import { Student } from '../Users/Student';

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
