import { InjectInMemoryDBService, InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Injectable } from '@nestjs/common';
import { BalanceService } from '../balance/balance.service';
import { ModelEntity } from './schemas/payment.schema';


@Injectable()
export class PaymentService {
  constructor(
    @InjectInMemoryDBService('payment') private modelService: InMemoryDBService<ModelEntity>,
    private readonly balanceService: BalanceService,
  ) {

  }

  createNewPayment(model) {
    
    let p = this.createModel(model);

    this.balanceService.updateBalanceForUsers(model.fromUserId, model.toUserId, model.amount);

    return p;
  }

  createModel(model) { //eg. { name, value, admin }
    return this.modelService.create(model);
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
