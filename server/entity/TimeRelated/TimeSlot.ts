import { Class } from '../ClassRelated/Class';
import { BaseEntity, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class TimeSlot extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, TimeSlot);
	}

	//Relationship to Class
	@OneToMany(() => Class, (classes) => classes.faculty, { cascade: true })
	public classes!: Class[];

	@PrimaryColumn()
	slotID: number;
}
