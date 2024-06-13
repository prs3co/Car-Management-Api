import { MaybeCompositeId } from 'objection'
import { CarsModel, Cars } from '../models/cars'

class CarRepository {
  async create( createArgs: Cars) {
    return CarsModel.query().insert(createArgs).returning('*')
  }

  async update(id: MaybeCompositeId, updateArgs: Cars) {
    return CarsModel.query()
      .where({ id })
      .patch(updateArgs)
      .throwIfNotFound()
      .returning('*')
  }

  async delete(id: MaybeCompositeId) {
    return CarsModel
      .query()
      .deleteById(id)
      .throwIfNotFound()
  }

  async getbyId(id: MaybeCompositeId) {
    return CarsModel.query().findById(id).throwIfNotFound()
  }

  async getAll() {
    const query = CarsModel.query()
    const [total, data] = await Promise.all([
      query.resultSize(),
      query.select()
    ])

    return {
      data,
      total
    }
  }

  async getByQuery(q: string) {
    const query = CarsModel
      .query()
      .whereLike('name', `%${q}%`)

    const [data, total] = await Promise.all([
      query.resultSize(),
      query.select()
    ])

    return {
      data,
      total
    }
  }
}

export type carsType = Cars
export default new CarRepository