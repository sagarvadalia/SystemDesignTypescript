import { Column, Entity } from 'typeorm';
import { Room } from './Room';

@Entity()
export class Lecture extends Room {
	constructor(...args) {
		super();
		Object.assign(this, Lecture);
	}

	@Column({ type: 'integer', nullable: false })
	numOfSeats: number;
}
