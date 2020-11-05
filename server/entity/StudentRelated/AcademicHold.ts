import { Column, Entity } from 'typeorm';
import { Hold } from './Hold';
@Entity()
export class AcademicHold extends Hold {
	constructor(...args) {
		super();
		Object.assign(this, AcademicHold);
	}
	@Column({ type: 'text', nullable: false })
	public actionRequired: string;
}
