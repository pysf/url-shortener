import { ShortURL } from './type'

export default (options: {
    setKey: (key: string, value: string) => Promise<void>
    createUUID: () => Promise<string>
    domain: string
}) => {
    const { createUUID, setKey, domain } = options
    return async (url: string): Promise<ShortURL> => {
        const id = await createUUID()
        await setKey(id, url)

        return {
            id,
            url,
            shortURL: `${domain}/${id}`,
        }
    }
}
