import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User.entity";
import { Post } from "./Post.entity";

@Entity()

export class Comment {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type:'longtext'})
    content: string;
    
    @ManyToOne((type) => User, (user) => user.comments)
    user:User
    @ManyToOne(type => Post, post => post.comments)
    post:Post

    @CreateDateColumn({ nullable: true })
    created_at: Date
    @UpdateDateColumn({ nullable: true })
    updated_at: Date
}