import { NextFunction, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { env } from 'process';
import { UsersModel } from '../models/users';

export async function authorize(req: any, res: Response, next: NextFunction) {
  try {
    const bearerToken = req.headers.authorization
    const token = bearerToken?.split('Bearer ')[1] as string
    const SECRET_KEY: Secret = env.JWT_KEY as string
    const tokenPayload = jwt.verify(token, SECRET_KEY) as any

    req.user = await UsersModel
      .query()
      .findOne({ id: tokenPayload.id })

    next()
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized"
    })
  }
}

export function checkPermission (role: string[]) {
  return (req: any, res: any, next: any) => {
    if (!role.includes(req.user.role)) {
      return res.status(401).json({
        message: 'Access denied'
      })
    }
    next()
  }
}