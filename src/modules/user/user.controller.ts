import { Body, Controller, Get, Post, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly entityService: UserService
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
