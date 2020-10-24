import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

// Need to handle the association with course
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
}
