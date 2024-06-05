import express, { Express } from 'express'
import {
  getCars,
  getCarById,
  addCar,
  updateCarById,
  deleteCarById
} from './app/controllers/api/cars'
import upload from './app/middleware/multer'

import knex from 'knex'
import { Model } from 'objection'
import 'dotenv/config'
import { env } from 'process'


const app:Express = express()
const knexInstance = knex({
  client: env.POSTGRES_CLIENT,
  connection: {
    database: env.POSTGRES_DB,
    user: env.POSTGRES_USER,
    password: env.POSTGRES_PASS,
    port: Number(env.POSTGRES_PORT)
  },
})
const port = 8000

Model.knex(knexInstance)

app.get("/api/v1/cars", getCars)
app.get('/api/v1/cars/:id', getCarById)
app.post('/api/v1/cars', upload.single('image'), addCar)
app.put('/api/v1/cars/:id', upload.single('image'), updateCarById)
app.delete('/api/v1/cars/:id', deleteCarById)

app.listen(port, () => {
  console.log(`Express running on http://localhost:${port}`)
  // console.log('run')
})