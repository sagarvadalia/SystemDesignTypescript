import { IsNotEmpty } from 'class-validator';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { Student } from './Student';

@Entity()
export class Graduate extends Student {
	constructor(...args) {
		super();
		Object.assign(this, Student);
		Object.assign(this, Graduate);
	}

	@Column({ type: 'boolean', nullable: false })
	@IsNotEmpty({ message: ' isFullTime option is required' })
	isFullTime: boolean;

	@Column({ type: 'text', nullable: false })
	@IsNotEmpty({ message: 'MasterOrPHD option is required' })
	mastersOrPHD: string;
}
