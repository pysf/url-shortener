import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import { Request, Response } from 'express'

const { OK, INTERNAL_SERVER_ERROR, NOT_FOUND } = StatusCodes

export function buildQueryURLHandler(options: {
    queryURL: (shortURL: string) => Promise<string | null>
}) {
    const { queryURL } = options

    return async function queryURLHandler(req: Request, res: Response) {
        try {
            const { url } = req.query
            const shortURL = await queryURL(url as string)
            if (!shortURL) {
                return res.status(NOT_FOUND).json({
                    error: ReasonPhrases.NOT_FOUND,
                })
            }

            return res.status(OK).json({
                url: shortURL,
            })
        } catch (err) {
            console.log(err)
            return res
                .status(INTERNAL_SERVER_ERROR)
                .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR })
        }
    }
}
