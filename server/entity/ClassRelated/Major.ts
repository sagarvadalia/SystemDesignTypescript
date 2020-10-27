import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Department } from '../Locations/Department';

@Entity()
export class Major extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Major);
	}

	@PrimaryColumn()
	majorID: number;

	@ManyToOne(() => Department, (department) => department.majors, {})
	@JoinColumn({ name: 'deptID' })
	public departments!: Department;

	@Column({ type: 'text', nullable: false })
	@IsNotEmpty({ message: 'Name must be provided' })
	majorName: string;

	@CreateDateColumn()
	createdAt: Date;
	@UpdateDateColumn()
	updatedAt: Date;
}
