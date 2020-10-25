import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class StudentMajor extends BaseEntity {
    constructor(...args) {
        super();
        Object.assign(this, StudentMajor);
    }


    @PrimaryColumn()
    majorID: number;

    @PrimaryColumn()
    sID: number;

    @Column({ nullable: false, type: 'text' })
    @IsNotEmpty({ message: 'Date Declared must be provided' })
    dateDeclared: string;
}
