import { IsNotEmpty } from 'class-validator';
import { Col } from 'sequelize/types/lib/utils';
import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Graduate } from './Graduate';
import { Room } from './Room';
import { UnderGraduate } from './UnderGraduate';

@Entity()
export class Lab extends Room {
	constructor(...args) {
		super();
		Object.assign(this, Lab);
	}

    @PrimaryColumn()
    roomID: number;

    @Column({ type: 'integer', nullable: false})
    numOfComputers: number;

	
}
