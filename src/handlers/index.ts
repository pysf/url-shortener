import { buildCreateURLHandler } from './create-url-handler'
import { createURL } from '../url'

const createURLHandler = buildCreateURLHandler({
    createURL,
})

export { createURLHandler }
