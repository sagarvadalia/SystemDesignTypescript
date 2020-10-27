import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Attendance extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Attendance);
	}

	@PrimaryColumn()
	classCRN: number;

	@PrimaryColumn()
	sID: number;

	@Column({ type: 'boolean', nullable: false })
	@IsNotEmpty({ message: 'isPresent must be provided ' })
	isPresent: boolean;

	@Column({ type: 'text', nullable: false })
	@IsNotEmpty({ message: 'date must be provided' })
	date: string;
}
