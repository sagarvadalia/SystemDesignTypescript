import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Room } from './Room';

@Entity()
export class Building extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Building);
	}

	@PrimaryColumn()
	buildingID: number;

	@Column({ type: 'text', nullable: false })
	@IsNotEmpty({ message: 'buildingType must be provided' })
	buildingType: string;

	//Relationship to Room
	@OneToMany(() => Room, (rooms) => rooms.buildings, {})
	public rooms!: Room[];
}
