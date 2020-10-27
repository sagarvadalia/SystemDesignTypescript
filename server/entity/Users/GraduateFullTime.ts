import { IsNotEmpty } from 'class-validator';
import { Col } from 'sequelize/types/lib/utils';
import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Graduate } from './Graduate';
import { UnderGraduate } from './UnderGraduate';

// Need to handle the association with course
@Entity()
export class GraduateFullTime extends Graduate {
	constructor(...args) {
		super();
		Object.assign(this, GraduateFullTime);
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
