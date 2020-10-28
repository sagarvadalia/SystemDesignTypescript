import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Prerequisite extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Prerequisite);
	}

	@PrimaryColumn()
	prereqCRN: number;

	@Column({ type: 'text', nullable: false })
	gradeRequired: string;

	@Column()
	yearCreated: number;
	@CreateDateColumn()
	createdAt: Date;
	@UpdateDateColumn()
	updatedAt: Date;
}
