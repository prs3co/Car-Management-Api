import { Request, Response } from 'express';
import { UsersModel } from '../../../models/users';
import { encryptPassword, checkPassword } from '../../../utils/encrypt';

async function login(req: Request, res: Response) {

}

async function register(req: Request, res: Response) {
  const { name, email, password, role, avatar } = req.body

  try {
    const encryptedPassword = await encryptPassword(password)

    const user = await UsersModel.query().insert(
      {
        name,
        email,
        password: encryptedPassword,
        role: 'user',
        avatar
      }
    )

    res.status(201).json({
      message: "Berhasil register",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.created_at,
        updatedAt: user.updated_at
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({  
      message: 'Internal server error'
    })
  }
}

export default {
  login,
  register
}