import { IsEmail, IsMobilePhone, IsNotEmpty } from "class-validator";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
export abstract class User extends BaseEntity {
    constructor(...args) {
        super();
        Object.assign(this, User);
    }
    @PrimaryGeneratedColumn({ type: "integer" })
    userID: number;

    @Column({ type: "text", nullable: false, width: 50, unique: true })
    @IsNotEmpty({ message: 'Username is required' })
    userName: String;
    @Column()
    @IsEmail({}, { message: "Please use Email Format" })
    @IsNotEmpty({ message: "Email is required" })
    @Column()
    userEmail: String;
    @Column({ type: "text", nullable: false, width: 20 })
    @IsNotEmpty({ message: "Password is required" })
    userPassword: String;
    @Column({type: "text", nullable: false})

    userPhone: String;
    @Column({ type: "text", nullable: false, unique: true })
    userAddress: String
    @Column({ type:"text"})
    userType: String

}
