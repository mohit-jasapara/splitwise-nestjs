import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { Module } from '@nestjs/common';
import { BalanceModule } from '../balance/balance.module';
import { EntityController } from './entity.controller';
import { PaymentService } from './payment.service';

@Module({
  imports: [
    InMemoryDBModule.forFeature('payment', {}),
    BalanceModule,
  ],
  controllers: [EntityController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
