import express from 'express'
import controllers from '../app/controllers'
import upload from '../app/middleware/multer'
import { authorize, checkPermission } from '../app/middleware/auth'

import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../openapi.json'

const apiRouter = express.Router()

apiRouter.route('/cars')
  .get(authorize, checkPermission(['superadmin', 'admin', 'user']), controllers.api.cars.getCars)
  .post(authorize, upload.single('image'), controllers.api.cars.addCar)

apiRouter.route('/cars/:id')
  .get(controllers.api.cars.getCarById)
  .put(upload.single('image'), controllers.api.cars.updateCarById)
  .delete(controllers.api.cars.deleteCarById)

apiRouter.post('/api/v1/register', controllers.api.users.register)
apiRouter.post('/api/v1/login', controllers.api.users.login)
apiRouter.post('/api/v1/auth', authorize, controllers.api.users.auth)

apiRouter.use('/api-docs', swaggerUi.serve);
apiRouter.get('/api-docs', swaggerUi.setup(swaggerDocument));

apiRouter.use(controllers.api.main.onLost) //Error 404
apiRouter.use(controllers.api.main.onError) //Error 500

export default apiRouter;