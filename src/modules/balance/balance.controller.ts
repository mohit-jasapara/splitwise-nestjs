import { Body, Controller, Get, Post, Delete, Query } from '@nestjs/common';
import { BalanceService } from './balance.service';

@Controller('balance')
export class BalanceController {
  constructor(
    private readonly entityService: BalanceService
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
    return this.entityService.createModel(model);
  }
}
