import express, { Express } from 'express'
import knex from 'knex'
import { Model } from 'objection'
import 'dotenv/config'
import { env } from 'process'
import apiRouter from '../config/routes'

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

Model.knex(knexInstance)

app.use(express.json())
app.use('/api/v1/', apiRouter)

export default app