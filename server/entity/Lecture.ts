import { IsNotEmpty } from 'class-validator';
import { Col } from 'sequelize/types/lib/utils';
import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Graduate } from './Graduate';
import { Room } from './Room';
import { UnderGraduate } from './UnderGraduate';

// Need to handle the association with course
@Entity()
export class Lecture extends Room {
	constructor(...args) {
		super();
		Object.assign(this, Lecture);
	}

    @PrimaryColumn()
    roomID: number;

    @Column({ type: 'integer', nullable: false})
    numOfSeats: number;

	
}