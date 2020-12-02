import { Body, Controller, Get, Post, Delete, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class EntityController {
  constructor(
    private readonly entityService: PaymentService
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
