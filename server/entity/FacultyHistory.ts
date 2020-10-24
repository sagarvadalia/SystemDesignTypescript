import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class FacultyHistory extends BaseEntity {
    constructor(...args) {
        super();
        Object.assign(this, FacultyHistory);
    }

    @PrimaryColumn()
    fID: number;

    @PrimaryColumn()
    classCRN: number;

    @Column({type: 'integer', nullable: false})
    @IsNotEmpty({message: ' semesterID must be provided'})
    semesterID: number;

    
}
