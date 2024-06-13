import cloudinary from '../middleware/cloudinary'
import CarRepository, { carsType } from '../repositories/carRepository'

class CarService {
  async create( requestBody: carsType) {
    return CarRepository.create(requestBody)
  }

  async update(id: string, requestBody: carsType) {
  return CarRepository.update(id, requestBody)

  }
  async delete(id: string) {
    return CarRepository.delete(id)
  }

  async getbyId(id: string) {
    return CarRepository.getbyId(id)
  }

  async get(query: any) {
    try {
      let cars
      if (!query) {
        cars = await CarRepository.getAll()
      } else {
        cars = await CarRepository.getByQuery(query)
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

  async upload(file: any) {
    const fileBase64 = file.buffer.toString("base64")
    const fileString = `data:${file.mimetype};base64,${fileBase64}`

    try {
      const result = await cloudinary.uploader.upload(fileString)
      return result
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export default new CarService