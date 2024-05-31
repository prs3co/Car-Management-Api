import { Request, Response } from 'express'
import { CarsModel } from '../../../models/cars'
import cloudinary from '../../middleware/cloudinary'
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary'

async function getCars(req: Request, res: Response) {
  const { q } = req.query

  if ( !q ) {
    const cars = await CarsModel.query()
    return res.status(200).json(cars)
  }
  const cars = await CarsModel
    .query()
    .whereLike('name', `%${q}%`)

  return res.status(200).json(cars)
}

async function getCarById(req: Request, res: Response) {
  const { id } = req.params

  try {
    const cars = await CarsModel.query().findById(id).throwIfNotFound()

    return res.status(200).json(cars)
  } catch (error) {
    return res.status(404).send('Data tidak ditemukan')
  }

}

async function addCar(req: Request, res: Response) {
  if(!req.body) {
    return res.status(400).send('Invalid Request')
  }

  const fileBase64 = req.file?.buffer.toString('base64')
  const file = `data:${req.file?.mimetype};base64,${fileBase64}`

  cloudinary.uploader.upload(file, async function(err: UploadApiErrorResponse, result: UploadApiResponse) {
    if(err) {
      console.log(err)
      return res.status(400).send('Gagal upload files')
    }

    const cars = await CarsModel.query().insert(
      {
        ...req.body,
        image: result.url
      }
    ).returning('*')
    return res.status(200).json(cars)
  })

}

async function updateCarById(req: Request, res: Response) {
  const { id } = req.params

  if (!req.file) {
    try {
      const cars = await CarsModel
        .query()
        .where({ id })
        .patch(req.body)
        .throwIfNotFound()
        .returning("*")

      return res.status(200).send('Data berhasil di update')
    } catch (error) {
      return res.status(404).send('Data tidak ditemukan')
    }
  }

  const fileBase64 = req.file.buffer.toString("base64")
  const file = `data:${req.file.mimetype};base64,${fileBase64}`


  cloudinary.uploader.upload(file, async function(err: UploadApiErrorResponse, 
    result:UploadApiResponse) {
      if (err) {
        console.log(err)
        return res.status(400).send('Gagal upload file')
      }

      try {
        const cars = await CarsModel
          .query()
          .where({ id })
          .patch({
            ...req.body,
            image: result.url
          })
          .throwIfNotFound()
          .returning('*')

        return res.status(404).send('Data berhasil di update')
      } catch (error) {
        return res.status(404).send('Data tidak ditemukan')
      }
    })
}

async function deleteCarById(req: Request, res: Response) {
  const { id } = req.params

  try {
    CarsModel
      .query()
      .deleteById(id)
      .throwIfNotFound()
      .then(() => res.status(200).send("Data berhasil di hapus"))
      .catch

  } catch (error) {
    return res.status(404).send('Data tidak ditemukan')
  }



}

export {
  getCars,
  getCarById,
  addCar,
  updateCarById,
  deleteCarById
}