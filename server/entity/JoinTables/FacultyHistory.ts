import { IsNotEmpty } from 'class-validator';
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryColumn,
	UpdateDateColumn,
	OneToOne,
	JoinColumn,
	OneToMany,
} from 'typeorm';
import { Class } from '../ClassRelated/Class';
import { Faculty } from '../Users/Faculty';

@Entity()
export class FacultyHistory extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, FacultyHistory);
	}
	@OneToOne(() => Class, (classes) => classes.classCRN, { primary: true, cascade: true, eager: true })
	@JoinColumn([{ name: 'classCRN', referencedColumnName: 'classCRN' }])
	classCRN!: number;
	@OneToOne(() => Class, (classes) => classes.faculty, { primary: true, cascade: true, eager: true })
	@JoinColumn([{ name: 'fid' }])
	fid!: number;
	@OneToOne(() => Class, (classes) => classes.semester, { cascade: true, eager: true })
	@JoinColumn([{ name: 'semesterID' }])
	semesterID!: number;
}
