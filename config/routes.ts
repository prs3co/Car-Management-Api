import express from 'express'
import controllers from '../app/controllers'
import upload from '../app/middleware/multer'
import { authorize, checkPermission } from '../app/middleware/auth'

import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../openapi.json'
import { readFileSync } from 'fs'

const apiRouter = express.Router()

apiRouter.route('/cars')
  .get(authorize, checkPermission(['superadmin', 'admin', 'user']), controllers.api.cars.getCars)
  .post(authorize, checkPermission(['superadmin', 'admin']), upload.single('image'), controllers.api.cars.addCar)

apiRouter.route('/cars/:id')
  .get(authorize, checkPermission(['superadmin', 'admin']), controllers.api.cars.getCarById)
  .put(authorize, checkPermission(['superadmin', 'admin']), upload.single('image'), controllers.api.cars.updateCarById)
  .delete(authorize, checkPermission(['superadmin', 'admin']), controllers.api.cars.deleteCarById)

apiRouter.post('/register', controllers.api.users.register)
apiRouter.post('/login', controllers.api.users.login)
apiRouter.post('/auth', authorize, controllers.api.users.auth)

apiRouter.use('/api-docs', swaggerUi.serve);
apiRouter.get('/api-docs', swaggerUi.setup(swaggerDocument));

apiRouter.get('/openapi', (req, res) => {
  try {
    const openapiDoc = readFileSync('./openapi.json', 'utf-8'); // Path menuju file swagger.json
    const openapiObject = JSON.parse(openapiDoc);
    res.json(openapiObject);
  } catch (err) {
    console.error('Error reading OpenAPI document:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

apiRouter.use(controllers.api.main.onLost) //Error 404
apiRouter.use(controllers.api.main.onError) //Error 500

export default apiRouter;