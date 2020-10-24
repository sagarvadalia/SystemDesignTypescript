import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { Faculty } from './Faculty';
import { Student } from './Student';

@Entity()
export class UnderGraduate extends Student {
    constructor(...args) {
        super();
        Object.assign(this, UnderGraduate);
    }
  
    @Column({ type: 'boolean', nullable: false})
    @IsNotEmpty({ message: ' isFullTime option is required' })
    isFullTime: boolean;

}