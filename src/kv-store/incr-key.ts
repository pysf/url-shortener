import { RedisClientType } from 'redis'

export function buildIncrKey(getRedisClient: () => Promise<RedisClientType>) {
    return async function incrKey(key: string): Promise<void> {
        const redisClient = await getRedisClient()
        await redisClient.INCR(key)
    }
}
