import { IsNotEmpty } from 'class-validator';
import { Col } from 'sequelize/types/lib/utils';
import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Graduate } from './Graduate';
import { Room } from './Room';
import { UnderGraduate } from './UnderGraduate';

// Need to handle the association with course
@Entity()
export class Office extends Room {
	constructor(...args) {
		super();
		Object.assign(this, Office);
	}

    @PrimaryColumn()
    roomID: number;

    @Column({ type: 'text', nullable: false})
    secretaryName: string;

	
}