import { Controller, Get, Param, NotFoundException, Post, HttpCode, Body, Delete } from "@nestjs/common";
import { ExpenseService } from "./expense.service";
import { CreateExpenseDto, ExpenseDto } from "./dto/expense.dto";


@Controller('expenses')
export class ExpenseController {
	constructor(private readonly expenseService: ExpenseService) { }

	@Post()
	@HttpCode(201)
	async createExpense(@Body() createExpenseDto: CreateExpenseDto) {
		await this.expenseService.createExpense(createExpenseDto);
	}

	@Get(':id')
	async getExpense(@Param('id') id: number): Promise<ExpenseDto | undefined> {
		const expenseDto = await this.expenseService.getExpense(id);
		if(expenseDto){
			return expenseDto;
		} else {
			throw new NotFoundException('Expense not found');
		}
	}

	@Delete(':id')
	@HttpCode(201)
	async deleteExpense(@Param('id') id: number): Promise<void> {
		await this.expenseService.deleteExpense(id)
	}


	@Get('/group/:id')
	async getExpensesByGroupId(@Param('id') id: number): Promise<ExpenseDto[]> {
		return await this.expenseService.getExpensesByGroupId(id);
	}
}
