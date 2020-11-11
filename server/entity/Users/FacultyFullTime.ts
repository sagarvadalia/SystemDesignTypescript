import { IsNotEmpty } from 'class-validator';
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Room } from '../Locations/Room';
import { Faculty } from './Faculty';
import { Lecture } from '../Locations/Lecture';

@Entity()
export class FacultyFullTime extends Faculty {
	constructor(...args) {
		super();
		Object.assign(this, Faculty);
		Object.assign(this, FacultyFullTime);
	}

	//One Department is in one room
	@OneToOne(() => Lecture, (lecture) => lecture.roomID,)
	@JoinColumn({ name: 'roomID', referencedColumnName: 'roomID' })
	public roomID!: Room;

	@Column({ type: 'text', nullable: false })
	@IsNotEmpty({ message: 'Faculty Salary is required' })
	fSalary: string;

	@Column({ type: 'boolean', nullable: false })
	@IsNotEmpty({ message: 'Faculty Tenure is required' })
	fTenure: boolean;
}
