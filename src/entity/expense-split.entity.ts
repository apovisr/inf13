import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'expenseSplit'})
export class ExpenseSplit {
	@PrimaryGeneratedColumn()
	id: number;
	@Column()
	expenseId: number;
	@Column()
	groupMemberId: number;
	@Column()
	amount: number;
}  