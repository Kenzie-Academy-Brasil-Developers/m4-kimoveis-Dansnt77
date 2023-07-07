import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Address } from "./address.entity";
import { Category } from "./category.entities";
import { Schedule } from "./schedules.entity";

@Entity("real_estate")
export class RealEstate {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({default: false})
    sold: boolean

    @Column({type: "decimal", default: 0})
    value: number | string

    @Column({type: "integer"})
    size: number

    @CreateDateColumn({type: "date"})
    createdAt: string

    @UpdateDateColumn({type: "date"})
    updatedAt: string

    @OneToOne(() => Address)
    @JoinColumn()
    address: Address

    @ManyToOne(() => Category, (category) => category.realEstate)
    category: Category

    @OneToMany(() => Schedule, Schedule => Schedule.realEstate)
    schedules: Schedule[]

}