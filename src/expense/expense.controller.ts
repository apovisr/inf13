import { Controller, Get, Param, NotFoundException, Post, HttpCode, Body } from "@nestjs/common";
import { ExpenseService } from "./expense.service";
import { CreateExpenseDto, ExpenseDto } from "./dto/expense.dto";


@Controller('expenses')
export class ExpenseController {
	constructor(private readonly expenseService: ExpenseService) { }

	@Post()
	@HttpCode(201)
	async createExpense(@Body() createExpenseDto: CreateExpenseDto) {
		this.expenseService.createExpense(createExpenseDto);
	}

	@Get(':id')
	async getExpense(@Param('id') id: number): Promise<ExpenseDto | undefined> {
		return this.expenseService.getExpense(id);
	}


	@Get('/group/:id')
	async getExpensesByGroupId(@Param('id') id: number): Promise<ExpenseDto[]> {
		return this.expenseService.getExpensesByGroupId(id);
	}
}
