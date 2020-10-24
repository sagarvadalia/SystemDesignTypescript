import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class StudentMinor extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, StudentMinor);
	}
	@PrimaryColumn()
	minorID: number;
	@Column({ nullable: false, type: 'text' })
	@IsNotEmpty({ message: 'Date Declared must be provided' })
	dateDeclared: string;
}
