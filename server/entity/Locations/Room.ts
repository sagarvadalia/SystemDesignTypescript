import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Class } from '../ClassRelated/Class';
import { Building } from './Building';

// Need to handle the association with course
@Entity()
export class Room extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Room);
	}

	@PrimaryColumn()
	roomID: number;

	@Column({ type: 'integer', nullable: false })
	@IsNotEmpty({ message: 'room number is required' })
	roomNum: number;

	@Column({ type: 'text', nullable: false })
	roomType: string;

	@Column({ type: 'integer', nullable: false })
	capacity: number;

	//Relationship to Class
	@OneToMany(() => Class, (classes) => classes.room, {})
	public classes!: Class[];

	//Relationship to Building
	@ManyToOne(() => Building, (buildings) => buildings.rooms, {})
	@JoinColumn({ name: 'buildingID' })
	public buildings!: Building[];
}
