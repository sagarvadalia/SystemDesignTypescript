import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class StudentMajor extends BaseEntity {
    constructor(...args) {
        super();
        Object.assign(this, StudentMajor);
    }

    @PrimaryColumn()
    buildingID: number;

    @Column({ type: 'text', nullable: false })
    @IsNotEmpty({ message: 'buildingType must be provided' })
    buildingType: string;

    @Column({ type: 'text', nullable: false })
    dateDeclared: string;
}
