import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Need to handle the association with course
@Entity()
export class Room extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Room);
	}
	@PrimaryGeneratedColumn()
	roomID: number;
	@Column({ type: 'integer', nullable: false })
	@IsNotEmpty({ message: 'room number is required' })
	roomNum: number;
	@Column({ type: 'text', nullable: false })
	roomType: string;
	@Column({ type: 'integer', nullable: false })
	capacity: number;
}
