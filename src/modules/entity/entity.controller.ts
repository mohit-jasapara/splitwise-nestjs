import { Body, Controller, Get, Post, Delete, Query } from '@nestjs/common';
import { EntityService } from './entity.service';

@Controller('entity')
export class EntityController {
  constructor(
    private readonly entityService: EntityService
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
