import { query } from 'express-validator'

export const queryURLSchema = [query('url').isString().isURL()]
