import express from 'express'
import controllers from '../app/controllers'
import upload from '../app/middleware/multer'

const apiRouter = express.Router()

apiRouter.get("/api/v1/cars", controllers.api.cars.getCars)
apiRouter.get('/api/v1/cars/:id', controllers.api.cars.getCarById)
apiRouter.post('/api/v1/cars', upload.single('image'), controllers.api.cars.addCar)
apiRouter.put('/api/v1/cars/:id', upload.single('image'), controllers.api.cars.updateCarById)
apiRouter.delete('/api/v1/cars/:id', controllers.api.cars.deleteCarById)

apiRouter.use(controllers.api.main.onLost) //Error 404
apiRouter.use(controllers.api.main.onError) //Error 500

export default apiRouter;