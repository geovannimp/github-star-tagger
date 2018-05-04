import { Entity, PrimaryColumn, Column, OneToMany, JoinTable } from "typeorm";
import { Repository } from "./Repository";
import { Token } from "./Token";

@Entity()
export class User {

    @PrimaryColumn()
    id: number;

    @Column()
    url: string;

    @Column()
    name: string;

    @Column()
    username: string;

    @Column()
    photo: string;

    @OneToMany(type => Token, token => token.user, {
        cascade: true,
    })
    tokens: Token[]

    @OneToMany(type => Repository, repository => repository.user, {
        cascade: true,
    })
    repositories: Repository[];

}
