import { IsNotEmpty } from 'class-validator';
import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryColumn,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Class } from '../ClassRelated/Class';
import { Building } from './Building';
import { Department } from './Department';
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


	//Relationship to Building
	@ManyToOne(() => Building, (buildings) => buildings.rooms, { eager: true, cascade: true })
	@JoinColumn()
	public buildings!: Building;
}
