import { buildCreateURL } from './create-url'
import { buildQueryURL } from './query-url'
import { buildRecordVisit } from './record-visit'
import config from 'config'
import { setKey, getKey, incrKey } from '../kv-store'
import { createID } from '../id'

const createURL = buildCreateURL({
    domain: config.get('SHORTNER_DOMAIN'),
    setKey,
    createID,
})

const recordVisit = buildRecordVisit({
    incrKey,
    keyPrefix: config.get('VISIT_KEY_PREFIX'),
})

const queryURL = buildQueryURL({
    getKey,
    recordVisit,
})

export { createURL, queryURL }
