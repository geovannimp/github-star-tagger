import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Repository {

    @PrimaryColumn()
    hash: string;

    @Column()
    url: string

    @Column()
    title: string;

    @Column()
    description: string;

    @Column("simple-array")
    tags: string[]

    @ManyToOne(type => User, user => user.repositories)
    user: User;

}
