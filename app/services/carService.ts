import CarRepository, { carsType } from '../repositories/carRepository'

const CarRepositories = new CarRepository

class CarService {
  async create( requestBody: carsType) {
    return CarRepositories.create(requestBody)
  }

  async update(id: number, requestBody: carsType) {
  return CarRepositories.update(id, requestBody)

  }
  async delete(id: number) {
    return CarRepositories.delete(id)
  }

  async getbyId(id: number) {
    return CarRepositories.getbyId(id)
  }

  async get(query: string) {
    try {
      let cars
      if (!query) {
        cars = await CarRepositories.getAll()
      } else {
        cars = await CarRepositories.getByQuery(query)
      }

      return {
        data: cars.data,
        count: cars.total
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}