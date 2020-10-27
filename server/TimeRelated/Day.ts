import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Day extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Day);
	}

	@PrimaryColumn({ type: 'text', nullable: false })
	dayName: string;
}
