import { BaseEntity, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Class } from '../ClassRelated/Class';
import { DayAndPeriod } from '../JoinTables/DayAndPeriod';

@Entity()
export class TimeSlot extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, TimeSlot);
	}

	//Relationship to Class
	@OneToMany(() => Class, (classes) => classes.faculty, { cascade: true })
	public classes!: Class[];

	@OneToMany(() => DayAndPeriod, (dayAndPeriod) => dayAndPeriod.slotID, { cascade: true })
	public dayAndPeriod!: DayAndPeriod[];

	@PrimaryGeneratedColumn()
	slotID: number;
}
