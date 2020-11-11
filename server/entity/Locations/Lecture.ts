import { Column, Entity, OneToMany } from 'typeorm';
import { Room } from './Room';
import { Class } from '../ClassRelated/Class';

@Entity()
export class Lecture extends Room {
	constructor(...args) {
		super();
		Object.assign(this, Lecture);
	}

	@Column({ type: 'integer', nullable: false })
	numSeats: number;

	//Relationship to Class
	@OneToMany(() => Class, (classes) => classes.roomID, {})
	public classes!: Class[];
}
