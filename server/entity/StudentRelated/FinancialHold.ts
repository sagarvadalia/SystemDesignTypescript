import { Column, Entity } from 'typeorm';
import { Hold } from './Hold';
@Entity()
export class FinancialHold extends Hold {
	constructor(...args) {
		super();
		Object.assign(this, FinancialHold);
	}
	@Column()
	public holdAmount: number;
}
