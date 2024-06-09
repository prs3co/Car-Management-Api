import { Model, ModelObject } from 'objection';

export class CarsModel extends Model {
  id!: number;
  name!: string;
  start_rent!: Date;
  finish_rent!: Date;
  price!: number;
  image!: string;

  static get tableName() {
    return 'cars'
  }
}

export type Cars = ModelObject<CarsModel>