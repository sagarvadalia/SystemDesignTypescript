import { Column, Entity } from 'typeorm';
import { Hold } from './Hold';
@Entity()
export class DisciplanaryHold extends Hold {
	constructor(...args) {
		super();
		Object.assign(this, DisciplanaryHold);
	}
	@Column({ type: 'text', nullable: false })
	public punishmentDesc: string;
}
