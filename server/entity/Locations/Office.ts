import { Column, Entity } from 'typeorm';
import { Room } from './Room';

@Entity()
export class Office extends Room {
	constructor(...args) {
		super();
		Object.assign(this, Office);
	}

	@Column()
	phoneExt: number;
}
