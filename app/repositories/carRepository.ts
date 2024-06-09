import { CarsModel, Cars } from '../models/cars'

class CarRepository {
  async create ( createArgs: Cars) {
    return CarsModel.query().insert(createArgs).returning('*')
  }

  async update (id: Number, updateArgs: Cars) {
    return CarsModel.query()
      .where({ id })
      .patch(updateArgs)
      .throwIfNotFound()
      .returning('*')
  }
}