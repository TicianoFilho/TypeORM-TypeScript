import { BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Subject } from "./Subject";
import { Video } from "./Video";

@Entity('rooms')
export class Room {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()                // @Column({ type: 'text' }) We can set field properties here.
    name: string;

    @Column({ nullable: true })
    description: string;

    @OneToMany(() => Video, video => video.room)
    videos: Video[];

    @ManyToMany(() => Subject, subject => subject.rooms)
    subjects: Subject[];
}