import { buildCreateURLHandler } from './create-url-handler'
import { buildQueryURLHandler } from './query-url-handler'
import { createURL, queryURL } from '../url'

const createURLHandler = buildCreateURLHandler({
    createURL,
})

const queryURLHandler = buildQueryURLHandler({
    queryURL,
})

export { createURLHandler, queryURLHandler }
