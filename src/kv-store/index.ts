import { buildSetKey } from './set-key'
import { buildGetKey } from './get-key'
import { buildIncrKey } from './incr-key'
import { redisClient } from '../redis'

const setKey = buildSetKey(redisClient)
const getKey = buildGetKey(redisClient)
const incrKey = buildIncrKey(redisClient)

export { setKey, getKey, incrKey }
