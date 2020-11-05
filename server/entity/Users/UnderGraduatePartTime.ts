import { IsNotEmpty } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { UnderGraduate } from './UnderGraduate';

// Need to handle the association with course
@Entity()
export class UnderGraduatePartTime extends UnderGraduate {
	constructor(...args) {
		super();
		Object.assign(this, UnderGraduatePartTime);
	}

	@Column({ type: 'text', nullable: false })
	@IsNotEmpty({ message: 'semester name is required' })
	tutionCost: string;

	@Column({ type: 'boolean', nullable: false })
	hasMealPlan: boolean;

	@Column({ type: 'integer', nullable: false })
	maxCreditsAllowed: number;

	@Column({ type: 'integer', nullable: false })
	minCreditsAllowed: number;

	@Column({ type: 'integer', nullable: false })
	currentCredits: number;
}
