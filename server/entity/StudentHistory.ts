import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class StudentHistory extends BaseEntity {
    constructor(...args) {
        super();
        Object.assign(this, StudentHistory);
    }

    @PrimaryColumn()
    classCRN: number;

    @Column({ type: 'integer', nullable: false })
    @IsNotEmpty({message: 'sID must be provided '})
    sID: number;

    @Column({ type: 'text', nullable: false })
    @IsNotEmpty({ message: 'grade received must be provided' })
    gradeReceived: string;

    @Column({ type: 'integer', nullable: false })
    @IsNotEmpty({message: 'semester ID must be provided '})
    semesterID: number;
}
