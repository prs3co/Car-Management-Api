import { Request, Response } from 'express';
import { encryptPassword, checkPassword } from '../../../utils/encrypt';
import { createToken } from '../../../utils/jwt';
import userService from '../../../services/userService';

async function login(req: any, res: Response) {
  const { email, password } = req.body

  const user = await userService.login(email)

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

  const token = await createToken({
    id: user.id,
    email: user.email,
    role: user.role,
    createdAt: user.created_at,
    updatedAt: user.updated_at
  })

  res.status(201).json({
    message: "Berhasil login",
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
      createdAt: user.created_at,
      updatedAt: user.updated_at
    }
  })
}

async function register(req: Request, res: Response) {
  const { name, email, password, avatar } = req.body

  try {
    const encryptedPassword = await encryptPassword(password)

    const user = await userService.register(
      {
        name,
        email,
        password: encryptedPassword,
        role: 'user',
        avatar,
        created_by: 'system',
        updated_by: 'system'
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

async function auth(req: any, res: Response) {
  let userWithoutPassword = { ...req.user };

  delete userWithoutPassword.password;

  res.status(200).json({
    status: 'OK',
    message: 'Success',
    data: userWithoutPassword
  })
}

export default {
  login,
  register,
  auth
}