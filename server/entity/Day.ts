
import { IsEmail, IsMobilePhone, IsNotEmpty } from "class-validator";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
export class Day extends BaseEntity {
    constructor(...args) {
        super();
        Object.assign(this, Day);
    }
  @PrimaryGeneratedColumn()
    dayID: number
  @Column({ type: "text", nullable: false})
    dayName: string

}
