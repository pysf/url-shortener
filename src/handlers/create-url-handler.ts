import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import { Request, Response } from 'express'
// import { createURL } from '../url'
import { ShortURL } from '../url/type'

const { OK, INTERNAL_SERVER_ERROR } = StatusCodes

export function buildCreateURLHandler(options: {
    createURL: (url: string) => Promise<ShortURL>
}) {
    const { createURL } = options

    return async function createURLHandler(req: Request, res: Response) {
        try {
            const { url } = req.body
            const shortURL = await createURL(url)
            return res.status(OK).json(shortURL)
        } catch (err) {
            return res
                .status(INTERNAL_SERVER_ERROR)
                .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR })
        }
    }
}
