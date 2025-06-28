import { User } from "src/user/entity/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'groupMember'})
export class GroupMember {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  groupId: number

  @ManyToOne(() => User, (user) => user.groupMembers)
    user: User
}


export interface Member {
  readonly id: number;
  readonly name: string;
}