import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class StudentMinor extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, StudentMinor);
	}

	@PrimaryColumn()
	minorID: number;

	@PrimaryColumn()
	sID: number;

	@Column({ nullable: false, type: 'text' })
	@IsNotEmpty({ message: 'Date Declared must be provided' })
	dateDeclared: string;
}
