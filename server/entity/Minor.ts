import { IsEmail, IsMobilePhone, IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Minor extends BaseEntity {
  constructor(...args) {
    super();
    Object.assign(this, Minor);
  }
  @PrimaryGeneratedColumn()
  minorID: number;
  @Column({ type: 'text', nullable: false })
  @IsNotEmpty({ message:"Name must be provided"})
  minorName: string;
}
