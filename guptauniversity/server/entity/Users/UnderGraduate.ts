import { IsNotEmpty } from 'class-validator';
import { Column, createConnection, Entity } from 'typeorm';
import { Student } from './Student';

@Entity()
export class UnderGraduate extends Student {
	constructor(...args) {
		super();
		Object.assign(this, Student);
		Object.assign(this, UnderGraduate);
	}

	@Column({ type: 'boolean', nullable: false })
	@IsNotEmpty({ message: ' isFullTime option is required' })
	isFullTime: boolean;

}
