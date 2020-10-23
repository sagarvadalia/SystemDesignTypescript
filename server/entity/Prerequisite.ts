
import { IsEmail, IsMobilePhone, IsNotEmpty } from "class-validator";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";
// Need to handle the association with course
@Entity()
export class Prerequisite extends BaseEntity {
    constructor(...args) {
        super();
        Object.assign(this, Prerequisite);
    }
  @PrimaryGeneratedColumn()
    prereqCRN: number
  @Column({ type: "text", nullable: false})
    gradeRequired: string

}
