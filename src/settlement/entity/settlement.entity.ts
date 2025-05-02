import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Settlement {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 80 })
  name: string;
  @Column()
  fromGroupMemberId: number;
  @Column()
  toGroupMemberId: number;
  @Column()
  amount: number;
  @Column()
  createdAt: Date;
}

export interface SettlementHelper {
  readonly id: number;
  readonly name: string;
  readonly fromGroupMemberId: number;
  readonly fromUserName: string;
  readonly toGroupMemberId: number;
  readonly toUserName: string;
  readonly amount: number;
  readonly createdAt: Date;
}
