import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Class } from '../ClassRelated/Class';

// Need to handle the association with course
@Entity()
export class Semester extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Semester);
	}

	//Relationship to Class
	@OneToMany(() => Class, (classes) => classes.semester, {})
	public classes!: Class[];

	@PrimaryGeneratedColumn()
	semesterID: number;

	@Column({ type: 'text', nullable: false })
	@IsNotEmpty({ message: 'semester name is required' })
	semesterName: string;

	@Column({ type: 'integer', nullable: false })
	yearNum: number;
}
