import { IsNotEmpty } from 'class-validator';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { Graduate } from './Graduate';

// Need to handle the association with course
@Entity()
export class GraduateFullTime extends Graduate {
	constructor(...args) {
		super();
		Object.assign(this, Graduate);
		Object.assign(this, GraduateFullTime);
	}

	@Column({ type: 'text', nullable: false })
	@IsNotEmpty({ message: 'Tuition is required' })
	tutionCost: string;

	@Column({ type: 'boolean', nullable: false })
	hasMealPlan: boolean;

	@Column({ type: 'boolean', nullable: false })
	isDorming: boolean;

	@Column({ type: 'integer', nullable: false })
	maxCreditsAllowed: number;

	@Column({ type: 'integer', nullable: false })
	minCreditsAllowed: number;

	@Column({ type: 'integer', nullable: false })
	currentCredits: number;
}
