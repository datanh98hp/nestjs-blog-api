import { User } from './User.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    subtitle: string;
    @Column()
    slug: string;
    @Column({type:'longtext'})
    content:string;
    @Column({nullable:true})
    thumbnail:string;
    @ManyToOne(()=>User,(user)=>user.posts)
    author:User
    @CreateDateColumn({nullable:true})
    created_at:Date
    @UpdateDateColumn({ nullable: true })
    updated_at: Date
}