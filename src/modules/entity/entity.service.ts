import { InjectInMemoryDBService, InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Injectable } from '@nestjs/common';
import { ModelEntity } from './schemas/model.schema';


@Injectable()
export class EntityService {
  constructor(
    @InjectInMemoryDBService('model') private modelService: InMemoryDBService<ModelEntity>
  ) {

  }

  seed() {
    let models = [
      {name: "User1", value: 1},
      {name: "User2", value: 2},
      {name: "User3", value: 3},
      {name: "User4", value: 4},
      {name: "User5", value: 5},
    ];

    this.modelService.createMany(models);
    return this.getAllModels();
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
