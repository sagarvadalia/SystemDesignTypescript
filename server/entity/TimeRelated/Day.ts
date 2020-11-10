import { BaseEntity, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { DayAndPeriod } from '../JoinTables/DayAndPeriod';

@Entity()
export class Day extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Day);
	}

	@PrimaryColumn({ type: 'text', nullable: false })
	nameOfDay: string;

	@OneToMany(() => DayAndPeriod, (dayAndPeriod) => dayAndPeriod.nameOfDay, { cascade: true })
	public dayAndPeriod!: DayAndPeriod[];
}
