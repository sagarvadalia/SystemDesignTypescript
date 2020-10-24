import { BaseEntity, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class TimeSlot extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, TimeSlot);
	}

	@PrimaryColumn()
	slotID: number;

}
