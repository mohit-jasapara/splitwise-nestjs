import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BalanceModule } from './modules/balance/balance.module';
import { EntityModule } from './modules/entity/entity.module';
import { ExpenseModule } from './modules/expense/expense.module';
import { PaymentModule } from './modules/payment/payment.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    InMemoryDBModule.forRoot({}),
    
    EntityModule,
    UserModule,
    ExpenseModule,
    BalanceModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
