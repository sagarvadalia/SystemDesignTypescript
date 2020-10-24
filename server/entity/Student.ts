import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity()
export abstract class Student extends User {
    constructor(...args) {
        super();
        Object.assign(this, Student);
    }
    @PrimaryGeneratedColumn({ type: 'integer' })

    @Column()
    @IsNotEmpty({ message: 'GPA is required' })
    sGPA: number;

    @Column()
    @IsNotEmpty({ message: 'Grad year is required' })
    sGradYear: number;

    @Column()
    @IsNotEmpty({ message: 'Date of birth is required' })
    sDOB: string;

    @Column()
    @IsNotEmpty({ message: 'Number of total credits is required' })
    totalCredits: number;

    @Column()
    @IsNotEmpty({ message: 'Type of student is required' })
    studentType: string;
}
