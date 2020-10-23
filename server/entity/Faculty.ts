import { IsNotEmpty } from "class-validator";
import { Column, Entity } from "typeorm";
import { User } from './User';

@Entity()
export class Faculty extends User {
    constructor(...args) {
        super();
        Object.assign(this, Faculty);
    }
    @Column({ nullable: false })
    @IsNotEmpty({message: "Faculty Tenure must be provided"})
    ftenure: Boolean
  @Column({ nullable: false, type: "text" })
      @IsNotEmpty({message: "Faculty Office Number must be provided"})
  fOfficeNumber: String
  @Column({ nullable: false, type: "text" })
    @IsNotEmpty({message: "Faculty status must be provided"})
  isFullTime: Boolean
}
