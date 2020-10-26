import { IsNotEmpty } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { Faculty } from './Faculty';

@Entity()
export class FacultyPartTime extends Faculty {
	constructor(...args) {
		super();
		Object.assign(this, FacultyPartTime);
	}

	@Column({ type: 'text', nullable: false })
	@IsNotEmpty({ message: ' Hourly pay is required' })
	hourlyPay: string;

	@Column({ type: 'text', nullable: false })
	@IsNotEmpty({ message: 'teachOrResearch is required' })
	teachOrResearch: string;
}
