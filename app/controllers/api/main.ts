import { ErrorRequestHandler, NextFunction, Request, Response } from "express"

const onLost = (req: Request, res: Response) => {
  res.status(404).json({
    status: 'FAIL',
    message: 'Route not found'
  })
}

const onError = (err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    status: 'ERROR',
    error: {
      name: err.name,
      message: err.message
    }
  })
}

export default {
  onLost,
  onError
}