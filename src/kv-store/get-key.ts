import { RedisClientType } from 'redis'

export function buildGetKey(getRedisClient: () => Promise<RedisClientType>) {
    return async function getKey(key: string): Promise<string | null> {
        const redisClient = await getRedisClient()
        return redisClient.get(key)
    }
}
