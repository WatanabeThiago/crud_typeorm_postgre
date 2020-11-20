import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn} from "typeorm";

@Entity('users')
export default class User {
    @PrimaryGeneratedColumn('increment')
    id: string

    @Column()
    name: string

    @CreateDateColumn({name: "created_At"})
    createdAt: Date;

    @UpdateDateColumn({name: "updated_At"})
    updatedAt: Date


}
