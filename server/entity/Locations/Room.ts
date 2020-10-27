import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Class } from '../ClassRelated/Class';

// Need to handle the association with course
@Entity()
export class Room extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Room);
	}

	//Relationship to Class
	@OneToMany(() => Class, (classes) => classes.faculty, {})
	public classes!: Class[];

	@PrimaryColumn()
	roomID: number;

	@Column({ type: 'integer', nullable: false })
	@IsNotEmpty({ message: 'room number is required' })
	roomNum: number;

	@Column({ type: 'text', nullable: false })
	roomType: string;

	@Column({ type: 'integer', nullable: false })
	capacity: number;
}
