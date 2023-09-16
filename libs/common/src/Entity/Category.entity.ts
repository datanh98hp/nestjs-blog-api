import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./Post.entity";


@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    status: boolean;

    @OneToMany((type) => Post, post => post.category)
    posts:Post[]
    
    @CreateDateColumn({ nullable: true })
    created_at: Date
    @UpdateDateColumn({ nullable: true })
    updated_at: Date
}