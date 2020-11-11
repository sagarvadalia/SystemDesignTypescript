import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DayAndPeriod } from '../JoinTables/DayAndPeriod';

@Entity()
export class Day extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Day);
	}

	@PrimaryGeneratedColumn()
	dayID: number;

	@Column()
	nameOfDay: string;

	@OneToMany(() => DayAndPeriod, (dayAndPeriod) => dayAndPeriod.dayID, { cascade: true })
	public dayAndPeriod!: DayAndPeriod[];
}
