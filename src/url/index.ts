import { buildCreateURL } from './create-url'
import config from 'config'
import { setKey } from '../kv-store'
import { createID } from '../id'

const createURL = buildCreateURL({
    domain: config.get('SHORTNER_DOMAIN'),
    setKey,
    createID: createID,
})

export { createURL }
