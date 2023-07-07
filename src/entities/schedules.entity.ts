import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RealEstate } from "./realEstate.entity";
import { User } from "./user.entity";

@Entity("schedules")
export class Schedule {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column()
    date: string

    @Column()
    hour: string

    @ManyToOne(() => RealEstate, RealEstate => RealEstate.schedules)
    realEstate: RealEstate

    @ManyToOne(() => User)
    user: User

}