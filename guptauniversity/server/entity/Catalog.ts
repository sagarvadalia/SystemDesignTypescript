import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Catalog extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Catalog);
	}

	@PrimaryGeneratedColumn()
	catalogID: number;

	@Column({ type: 'text', nullable: false })
	courseID: string;
}
