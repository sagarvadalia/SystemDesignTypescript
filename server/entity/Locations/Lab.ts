import { Column, Entity } from 'typeorm';
import { Room } from './Room';

@Entity()
export class Lab extends Room {
	constructor(...args) {
		super();
		Object.assign(this, Lab);
	}

	@Column({ type: 'integer', nullable: false })
	numOfComputers: number;
}
