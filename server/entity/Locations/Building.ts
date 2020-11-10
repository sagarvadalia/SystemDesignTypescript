import { IsNotEmpty } from 'class-validator';
import { Room } from './Room';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Building extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Building);
	}

	@PrimaryGeneratedColumn()
	buildingID: number;

	@Column({ type: 'text', nullable: false })
	@IsNotEmpty({ message: 'buildingType must be provided' })
	buildingType: string;

	@Column({ type: 'text', nullable: false })
	buildingName: string;

	//Relationship to Room
	@OneToMany(() => Room, (rooms) => rooms.buildings, {})
	public rooms!: Room[];
}
