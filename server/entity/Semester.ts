import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

// Need to handle the association with course
@Entity()
export class Semester extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Semester);
	}

	@PrimaryColumn()
	semesterID: number;

	@Column({ type: 'text', nullable: false })
	@IsNotEmpty({ message: 'semester name is required' })
	semesterName: string;

	@Column({ type: 'integer', nullable: false })
	yearNum: number;
}
