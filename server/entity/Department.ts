import { IsEmail, IsMobilePhone, IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export abstract class Department extends BaseEntity {
    constructor(...args) {
        super();
        Object.assign(this, Department);
    }
    @PrimaryGeneratedColumn({ type: 'integer' })
    deptID: number;

    @Column({ type: 'text', nullable: false, width: 50, unique: true })
    @IsNotEmpty({ message: 'Department name is required' })
    deptName: string;

    @Column()
    @IsEmail({}, { message: 'Please use Email Format' })
    @IsNotEmpty({ message: 'Department Email is required' })
    deptEmail: string;

    @Column({ type: 'text', nullable: false, width: 20 })
    @IsNotEmpty({ message: 'Department phone is required' })
    deptPhone: string;

    @Column({ type: 'text', nullable: false })
    @IsNotEmpty({ message: 'Department managers name is required' })
    deptManager: string;
}
