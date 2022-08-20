import { RedisClientType } from 'redis'

export function buildSetKey(getRedisClient: () => Promise<RedisClientType>) {
    return async function setKey(key: string, value: string): Promise<void> {
        const redisClient = await getRedisClient()
        await redisClient.set(key, value)
    }
}
