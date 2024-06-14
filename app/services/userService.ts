import userRepository, { usersType } from '../repositories/userRepository'

class CarService {
  async login( email: string) {
    return userRepository.login(email)
  }

  async register(requestBody: usersType) {
  return userRepository.register(requestBody)

  }

}

export default new CarService