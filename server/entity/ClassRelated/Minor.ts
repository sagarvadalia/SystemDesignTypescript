import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Department } from '../Locations/Department';

@Entity()
export class Minor extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Minor);
	}

	@PrimaryColumn()
	minorID: number;

	@ManyToOne(() => Department, (department) => department.minors, {})
	@JoinColumn({ name: 'deptID' })
	public departments!: Department;

	@Column({ type: 'text', nullable: false })
	@IsNotEmpty({ message: 'Name must be provided' })
	minorName: string;

	@CreateDateColumn()
	createdAt: Date;
	@UpdateDateColumn()
	updatedAt: Date;
}