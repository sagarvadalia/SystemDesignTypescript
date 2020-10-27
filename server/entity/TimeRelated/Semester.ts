import { IsNotEmpty } from 'class-validator';
import { Class } from '../ClassRelated/Class';
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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

	@CreateDateColumn()
	createdAt: Date;
	@UpdateDateColumn()
	updatedAt: Date;
}
