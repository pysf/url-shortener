import { Router } from 'express'
import { createURLHandler, queryURLHandler } from '../handlers'
import { requestValidator } from '../middlewares'
import { createURLSchema, queryURLSchema } from '../request-schema'

const router = Router()

router.post('/url', createURLSchema, requestValidator, createURLHandler)
router.get('/url', queryURLSchema, requestValidator, queryURLHandler)

export default router
