import { body } from 'express-validator'

export const createURLSchema = [body('url').isString().isURL()]
