import { RedisClientType, createClient } from 'redis'

let client: RedisClientType

export function buildRedisClient(option: { url: string }) {
    const { url } = option

    return async function redisClient(): Promise<RedisClientType> {
        return new Promise((resolve, reject) => {
            if (!client) {
                client = createClient({
                    url,
                })

                client.on('error', (err) => {
                    reject(err)
                })

                client.on('ready', () => {
                    resolve(client)
                })

                client.on('reconnecting', () => {
                    console.log('reconnecting to redis...')
                })

                client.connect()
            } else {
                resolve(client)
            }
        })
    }
}
