import { GroupMember } from "src/groupmember/entity/group-meber.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 80 })
  name: string;

  @Column({ length: 80 })
  email: string

  @OneToMany(() => GroupMember, (groupMember) => groupMember.user, {
    onDelete: 'CASCADE',
  }) // note: we will create author property in the Photo class below
  groupMembers: GroupMember[]
}