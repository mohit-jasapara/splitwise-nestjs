import { Body, Controller, Get, Post, Delete, Query } from '@nestjs/common';
import { ExpenseService } from './expense.service';

@Controller('expense')
export class ExpenseController {
  constructor(
    private readonly entityService: ExpenseService
  ) {
    
  }

  @Get()
  getAll() {
    return this.entityService.getAllModels();
  }

  @Get('query')
  query(@Query() params) {
    // return params;
    return this.entityService.queryModel(params, false);
  }

  @Post()
  create(@Body() model) {
    // return model;
    return this.entityService.createNewExpense(model);
  }
}
