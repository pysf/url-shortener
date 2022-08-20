import { Router } from 'express'
import { createURLHandler } from '../handlers'
import { requestValidator } from '../middlewares'
import { createURLSchema } from '../request-schema'

const router = Router()

router.post('/url', createURLSchema, requestValidator, createURLHandler)

export default router
