import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'groupMember'})
export class GroupMember {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  groupId: number
}


export interface Member {
  readonly id: number;
  readonly name: string;
}