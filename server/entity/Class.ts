import { IsEmail, IsMobilePhone, IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
// Need to handle the association with course
@Entity()
export class Class extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Class);
	}
	@PrimaryGeneratedColumn()
	classID: number;
	@Column({ type: 'text', nullable: false })
	@IsNotEmpty({ message: 'section is required' })
	classSection: string;
	@Column({ type: 'integer', nullable: false })
	numOfSeats: number;
}