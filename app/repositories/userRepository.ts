import { Users, UsersModel } from '../models/users'

class CarRepository {
  async login(email: string) {
    return UsersModel
      .query()
      .findOne({ email })
  }

  async register(registerArgs: Users) {
    return UsersModel.query().insert(registerArgs)
  }
}

export type usersType = Users
export default new CarRepository