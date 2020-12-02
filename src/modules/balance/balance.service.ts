import { InjectInMemoryDBService, InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Injectable } from '@nestjs/common';
import { BalanceEntity } from './schemas/balance.schema';


@Injectable()
export class BalanceService {
  constructor(
    @InjectInMemoryDBService('balance') private modelService: InMemoryDBService<BalanceEntity>
  ) {

  }

  updateBalanceForUsers(payUserId, oweUserId, amount) {
    if (payUserId == oweUserId) return false;

    let balance = this.getOrCreateBalanceObject(payUserId, oweUserId);

    if (balance.payUserId == payUserId)
      balance.balance += amount;
    else balance.balance -= amount;

    balance.updatedAt = new Date().toUTCString();

    this.updateModel(balance);
    return this.getModel(balance.id);
  }

  getOrCreateBalanceObject(userId1, userId2) {
    let b = this.findBalanceObject(userId1, userId2);

    if (!b) {
      b = this.createModel({ payUserId: userId1, oweUserId: userId2, balance: 0, updatedAt: new Date().toUTCString() });
    }

    return b;
  }

  findBalanceObject(userId1, userId2) {
    let b =  this.modelService.query( (record) => (record.payUserId == userId1 && record.oweUserId == userId2) || (record.payUserId == userId2 && record.oweUserId == userId1) );
    if (b.length) return b[0];
    return null;
  }

  getBalancesForUser(id) {
    return this.modelService.query( (record) => (record.payUserId == id || record.oweUserId == id) && record.balance != 0 );
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
