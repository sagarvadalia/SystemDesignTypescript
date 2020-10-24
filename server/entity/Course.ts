import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export abstract class Course extends BaseEntity {
    constructor(...args) {
        super();
        Object.assign(this, Course);
    }
    @PrimaryGeneratedColumn({ type: 'integer' })
    courseID: number;

    @Column({ type: 'text', nullable: false, width: 50, unique: true })
    @IsNotEmpty({ message: 'Course name is required' })
    courseName: string;

    @Column()
    @IsNotEmpty({ message: 'Course description is required' })
    courseDesc: string;

    @Column()
    @IsNotEmpty({ message: 'Number of credits is required' })
    numOfCredits: number;
}
