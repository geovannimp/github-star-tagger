import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Token {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    browser: string;

    @Column()
    access_token: string

    @ManyToOne(type => User, user => user.tokens)
    user: User;

}
