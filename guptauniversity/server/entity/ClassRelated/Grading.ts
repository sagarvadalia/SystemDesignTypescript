import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StudentMinor } from '../JoinTables/StudentMinor';

import { Department } from '../Locations/Department';
import { MinorRequirement } from './MinorRequirement';

@Entity()
export class Grading extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Grading);
	}

    @PrimaryGeneratedColumn()
    gradingID: number;

	@Column({ type: 'bool', nullable: false, default: false})
	@IsNotEmpty({ message: 'Value is needed' })
	canAddCourse: boolean;

    @Column({type: 'bool', nullable: false, default: false})
    @IsNotEmpty({message: 'Value is needed'})
    canAddMidtermGrade: boolean;

    @Column({type: 'bool', nullable: false, default: false})
    @IsNotEmpty({message: 'Value is needed'})
    canAddFinalGrade: boolean;

}