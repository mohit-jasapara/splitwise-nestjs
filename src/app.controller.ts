import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { BalanceService } from './modules/balance/balance.service';
import { ExpenseService } from './modules/expense/expense.service';
import { PaymentService } from './modules/payment/payment.service';
import { UserService } from './modules/user/user.service';

@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
    private readonly expenseService: ExpenseService,
    private readonly balanceService: BalanceService,
    private readonly paymentService: PaymentService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('main')
  main() {
    let users = this.userService.seed();

    let expense1 = this.expenseService.createNewExpense({
      paidBy: users[0].id,
      amount: 1000,
      splitType: "exact",
      splitValues: [ {userId: users[0].id, value: 250}, {userId: users[1].id, value: 250}, {userId: users[2].id, value: 250}, {userId: users[3].id, value: 250} ],
      createdAt: new Date().toUTCString()
    });

    let expense2 = this.expenseService.createNewExpense({
      paidBy: users[0].id,
      amount: 1000,
      splitType: "percent",
      splitValues: [ {userId: users[0].id, value: 25}, {userId: users[1].id, value: 25}, {userId: users[2].id, value: 25}, {userId: users[3].id, value: 25} ],
      createdAt: new Date().toUTCString()
    });

    let balances = this.balanceService.getBalancesForUser(users[0].id);
    console.log("balances", balances);
    

    let payment = this.paymentService.createNewPayment({
      fromUserId: users[1].id,
      toUserId: users[0].id,
      amount: 500,
      createdAt: new Date().toUTCString()
    });
    console.log("payment", payment);

    let payment2 = this.paymentService.createNewPayment({
      fromUserId: users[1].id,
      toUserId: users[2].id,
      amount: 500,
      createdAt: new Date().toUTCString()
    });
    console.log("payment2", payment2);
    

    let balances2 = this.balanceService.getBalancesForUser(users[0].id);
    console.log("balances2", balances2);
  }
}
