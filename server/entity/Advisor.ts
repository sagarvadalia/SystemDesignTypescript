import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Faculty } from '../entity/Faculty';
import { Student } from '../entity/Student';

@Entity()
export class Advisor extends BaseEntity {
    constructor(...args) {
        super();
        Object.assign(this, Advisor);
    }

    @OneToOne(() => Student)
    @JoinColumn()
    @PrimaryColumn()
    sID: number;

    @OneToOne(() => Faculty)
    @JoinColumn()
    @PrimaryColumn()
    fID: number;

    @Column({ type: 'text', nullable: false })
    @IsNotEmpty({ message: 'Date assigned must be provided' })
    dateAssigned: string;
}
