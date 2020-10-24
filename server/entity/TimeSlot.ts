import { IsEmail, IsMobilePhone, IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class TimeSlot extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, TimeSlot);
	}
	@PrimaryGeneratedColumn()
	slotID: number;
	
}
