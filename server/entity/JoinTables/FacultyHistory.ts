import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Class } from '../ClassRelated/Class';

@Entity()
export class FacultyHistory extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, FacultyHistory);
	}

	@PrimaryColumn({ nullable: false })
	fID: number;

	@Column({ nullable: false })
	sID: number;

	@Column({ nullable: false })
	semesterID: number;

	@OneToOne(() => Class, (classes) => classes.classCRN, { primary: true, cascade: true, eager: true })
	@JoinColumn({ name: 'classCRN' })
	classCRN: number;
}
