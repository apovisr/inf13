import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 80 })
  name: string;

  @Column({length: 100, nullable: true})
  description?: string
}