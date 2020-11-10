import { Class } from '../ClassRelated/Class';
import { BaseEntity, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { TimeSlotDay } from '../JoinTables/TimeSlotDay';

@Entity()
export class TimeSlot extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, TimeSlot);
	}

	//Relationship to Class
	@OneToMany(() => Class, (classes) => classes.faculty, { cascade: true })
	public classes!: Class[];

	@OneToMany(() => TimeSlotDay, (timeSlotDay) => timeSlotDay.slotID, { cascade: true })
	public timeSlotDay!: TimeSlotDay[];

	@PrimaryGeneratedColumn()
	slotID: number;
}
