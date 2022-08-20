import { buildRedisClient } from './redis-client'
import config from 'config'

const redisClient = buildRedisClient({
    url: config.get('REDIS_URL'),
})
export { redisClient }
