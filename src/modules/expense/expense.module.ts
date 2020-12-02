import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { Module } from '@nestjs/common';
import { BalanceModule } from '../balance/balance.module';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';

@Module({
  imports: [
    InMemoryDBModule.forFeature('expense', {}),
    BalanceModule
  ],
  controllers: [ExpenseController],
  providers: [
    ExpenseService,
  ],
  exports: [ExpenseService],
})
export class ExpenseModule {}
