import { Request, Response } from 'express';
import { UsersModel } from '../../../models/users';
import { encryptPassword, checkPassword } from '../../../utils/encrypt';

async function login(req: Request, res: Response) {
  const { email, password } = req.body

  const user = await UsersModel
    .query()
    .findOne({ email })

  if (!user) {
    return res.status(404).json({
      message: 'Email tidak ditemukan'
    })
  }

  const isPasswordCorrect = await checkPassword(user.password, password)

  if (!isPasswordCorrect) {
    return res.status(401).json({
      message: 'Password salah'
    })
  }

  res.status(201).json({
    message: "Berhasil login",
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.created_at,
      updatedAt: user.updated_at
    }
  })
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