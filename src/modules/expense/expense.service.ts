import { InjectInMemoryDBService, InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ExpenseEntity } from './schemas/expense.schema';
import { sumBy } from 'lodash';
import { BalanceService } from '../balance/balance.service';


@Injectable()
export class ExpenseService {
  constructor(
    @InjectInMemoryDBService('expense') private modelService: InMemoryDBService<ExpenseEntity>,
    private readonly balanceService: BalanceService,
  ) {

  }

  createNewExpense(model) { //eg. { name, value, admin }
    let splitType = model.splitType;
    let splitValues = model.splitValues;

    let splitConfig = this.createSplitConfigObject(splitType, model.amount, splitValues);

    let expenseData = {
      paidBy: model.paidBy,
      amount: model.amount,
      splitType,
      splitConfig,
      createdAt: model.createdAt,
    };

    // return expenseData;
    let expense = this.modelService.create(expenseData);

    //handle user balances after expense created
    Object.keys(expense.splitConfig).map( oweUserId => {
      let b = this.balanceService.updateBalanceForUsers(expense.paidBy, oweUserId, expense.splitConfig[oweUserId]);
      console.log("balance updated", b);
    } );

    return expense;
  }

  createSplitConfigObject(splitType, totalAmount, splitValues): object {
    switch (splitType) {
      case "exact":
        let checkTotalValid = this.verifyExactSplitValuesSum(totalAmount, splitValues);
        if (!checkTotalValid)
          throw new HttpException('Invalid split values sum', HttpStatus.FORBIDDEN);

        return this.formSplitConfigFromSplitValues(splitValues);
      
      case "percent":
        let checkPercentValid = this.verifyPercentSplitValuesSum(splitValues);
        if (!checkPercentValid)
          throw new HttpException('Invalid split percent sum', HttpStatus.FORBIDDEN);

        let amountSplitValues = this.getExactSplitValuesFromPercentSplitValues(totalAmount, splitValues);
        return this.formSplitConfigFromSplitValues(amountSplitValues);
    
      default:
        break;
    }
    throw new HttpException('Invalid split type value', HttpStatus.FORBIDDEN);
  }

  verifyExactSplitValuesSum(totalAmount, splitValues) {
    return totalAmount == sumBy(splitValues, 'value');
  }

  verifyPercentSplitValuesSum(splitValues) {
    return 100 == sumBy(splitValues, 'value');
  }

  getExactSplitValuesFromPercentSplitValues(totalAmount, splitValues) {
    let sumTotal = 0;
    let splits =  splitValues.map(split => {
      let amount = parseFloat( ( totalAmount * split.value / 100 ).toFixed(2) )
      sumTotal += amount;
      return {
        userId: split.userId,
        value: amount,
      }
    });

    if (sumTotal - totalAmount) splits[0].value -= ( sumTotal - totalAmount ); // round off correction

    return splits;

  }

  formSplitConfigFromSplitValues(splitValues) {
    return splitValues.reduce((config, split) => {
      config[split.userId] = split.value;
      return config;
    }, {});
  }

  createManyModels(models) { //eg. [ { name, value, admin } ]
    return this.modelService.createMany(models);
  }

  updateModel(model) { //eg. {id, name}
    return this.modelService.update(model);
  }

  deleteModel(id) { //eg. id
    return this.modelService.delete(id);
  }

  getModel(id) { //eg. id
    return this.modelService.get(id);
  }

  queryModel(query, union = false) { //eg. filter all where record.key == query.key
    const predicate = (record) => union ? Object.keys(query).reduce((pred, key) => pred && record[key] == query[key], true) : Object.keys(query).reduce((pred, key) => pred || record[key] == query[key], false);
    return this.modelService.query( predicate );
    // return this.modelService.query( (record) => record.value == query.value );
  }

  getAllModels() {
    return this.modelService.getAll();
  }

}
