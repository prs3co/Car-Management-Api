import { Request, Response } from 'express'
import carService from '../../../services/carService'

async function getCars(req: Request, res: Response) {
  const { q } = req.query

  const cars = await carService.get(q)
  return res.status(200).json(cars)
}

async function getCarById(req: Request, res: Response) {
  const { id } = req.params

  try {
    const cars = await carService.getbyId(id)

    return res.status(200).json(cars)
  } catch (error) {
    return res.status(404).send('Data tidak ditemukan')
  }

}

async function addCar(req: Request, res: Response) {
  if(!req.body) {
    return res.status(400).send('Invalid Request')
  }

  try {
    const fileUpload = await carService.upload(req.file)
    const cars = await carService.create(
      {
        ...req.body,
        image: fileUpload.url
      }
    )

    return res.status(200).json(cars)
  } catch (error) {
    return res.status(400).send('Gagal upload file')
  }
}

async function updateCarById(req: Request, res: Response) {
  const { id } = req.params

  if (!req.file) {
    try {
      const cars = await carService.update(id, req.body)
      return res.status(200).send('Data berhasil di update')
    } catch (error) {
      return res.status(404).send('Data tidak ditemukan')
    }
  }

  try {
    let fileUpload
    try {
      fileUpload = await carService.upload(req.file)
    } catch (error) {
      return res.status(400).send('Gagal upload file')
    }

    const cars = carService.update(id, {
      ...req.body,
      image: fileUpload.url
    })

    return res.status(404).send('Data berhasil di update')
  } catch (error) {
    return res.status(404).send('Data tidak ditemukan')
  }
}

async function deleteCarById(req: Request, res: Response) {
  const { id } = req.params

  try {
    const cars = await carService.delete(id)

    return res.status(200).send("Data berhasil di hapus")
  } catch (error) {
    return res.status(404).send('Data tidak ditemukan')
  }

}

export default {
  getCars,
  getCarById,
  addCar,
  updateCarById,
  deleteCarById
}