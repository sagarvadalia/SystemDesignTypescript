import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Major extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Major);
	}
	@PrimaryGeneratedColumn()
	majorID: number;
	@Column({ type: 'text', nullable: false })
	@IsNotEmpty({ message: 'Name must be provided' })
	majorName: string;
}
