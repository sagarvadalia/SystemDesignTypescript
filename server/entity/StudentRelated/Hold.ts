import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { StudentHold } from '../JoinTables/StudentHold';

@Entity()
export class Hold extends BaseEntity {
	constructor(...args) {
		super();
		Object.assign(this, Hold);
	}

	@PrimaryColumn()
	holdID: number;
	@Column({ type: 'text', nullable: false })
	holdType: string;
	@Column({ type: 'text', nullable: false })
	holdDescription: string;
	@OneToMany(() => StudentHold, (studentHolds) => studentHolds.holdID, { cascade: true })
	public studentHolds!: StudentHold[];
}
