import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Class } from '../ClassRelated/Class';
import { Period } from './Period';

@Entity()
export class TimeSlot extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, TimeSlot);
	}

	//Relationship to Class
	@OneToMany(() => Class, (classes) => classes.fID, { cascade: true })
	public classes!: Class[];

	@ManyToOne(() => Period, (period) => period.timeslots)
	@JoinColumn({ name: 'periodID' })
	public periodID!: Period;

	@PrimaryGeneratedColumn()
	slotID: number;

	@Column()
	days: string;
}
