import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Expense {
	@PrimaryGeneratedColumn()
	id: number;
	@Column({ length: 80 })
	name: string;
	@Column()
	totalAmount: number;
	@Column()
	groupMemberId: number;
	@Column()
	createdAt: Date;
}

export interface ExpenseSplitHelper {
	readonly id: number;
	readonly expenseId: number;
	readonly amount: number;
	readonly groupMemberId: number;
	readonly groupMemberName: string;
}
