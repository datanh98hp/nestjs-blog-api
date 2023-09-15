import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./Post.entity";
import { hash } from "bcrypt";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({unique:true})
    username: string;
    @Column()
    password: string;
    @Column()
    email: string;
    @Column({nullable:true,default:null})
    refresh_token: string;
    @Column({nullable:true})
    img: string;
    @Column({default:'normal'})
    role: string;
    @Column()
    status:number;
    @OneToMany(type => Post, post => post.author)
    posts:Post[];
    @CreateDateColumn({ nullable: true })
    created_at: Date
    @UpdateDateColumn({ nullable: true })
    updated_at: Date

    // @BeforeInsert()
    // async hashPassword() {
    //     this.password = await hash(this.password, 10);
    // }
}