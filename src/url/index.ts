import buildCreateUrl from './create-url'
import config from 'config'
import { setKey } from '../kv-store'
import { createUUID } from '../uuid'

const createURL = buildCreateUrl({
    domain: config.get('SHORTNER_DOMAIN'),
    setKey,
    createUUID,
})

export { createURL }
