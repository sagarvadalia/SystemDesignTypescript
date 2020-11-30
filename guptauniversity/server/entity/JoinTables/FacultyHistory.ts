import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Class } from '../ClassRelated/Class';

@Entity()
export class FacultyHistory extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, FacultyHistory);
	}

	@OneToOne(() => Class, (classes) => classes.classCRN, { primary: true, cascade: true, eager: true })
	@JoinColumn({ name: 'classCRN', referencedColumnName: 'classCRN' })
	classCRN: number;
}
