import jwt, { Secret } from 'jsonwebtoken'
import { env } from 'process'
import 'dotenv/config'

const SECRET_KEY: Secret = env.JWT_KEY as string

export async function createToken(payload: any) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1800s'})
}