import { StatusCodes } from 'http-status-codes'
import { Request, Response, NextFunction } from 'express'

import { validationResult } from 'express-validator'
const { BAD_REQUEST } = StatusCodes

export function requestValidator(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(BAD_REQUEST).json({ errors: errors.array() })
        return
    }
    next()
    return
}
