import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Enrollment } from '../JoinTables/Enrollment';

// Need to handle the association with course
@Entity()
export class Class extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Class);
	}

	@OneToMany(() => Enrollment, (enrollment) => enrollment.class, { cascade: true })
	public enrollment!: Enrollment;
	@PrimaryColumn()
	classCRN: number;

	@Column({ type: 'text', nullable: false })
	@IsNotEmpty({ message: 'section is required' })
	classSection: string;

	@Column({ type: 'integer', nullable: false })
	numOfSeats: number;
}
