import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

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
}
