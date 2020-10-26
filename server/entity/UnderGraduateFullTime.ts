import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { UnderGraduate } from './UnderGraduate';

// Need to handle the association with course
@Entity()
export class UnderGraduateFullTime extends UnderGraduate {
	constructor(...args) {
		super();
		Object.assign(this, UnderGraduateFullTime);
	}

	@Column({ type: 'text', nullable: false })
	@IsNotEmpty({ message: 'semester name is required' })
	tutionCost: string;

	@Column({ type: 'boolean', nullable: false })
	hasMeanPlan: boolean;

	@Column({ type: 'boolean', nullable: false })
	isDorming: boolean;

	@Column({ type: 'integer', nullable: false })
	maxCreditsAllowed: number;

	@Column({ type: 'integer', nullable: false })
	minCreditsAllowed: number;

	@Column({ type: 'integer', nullable: false })
	currentCredits: number;
}
