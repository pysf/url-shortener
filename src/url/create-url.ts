import { ShortURL } from './type'

export function buildCreateURL(options: {
    setKey: (key: string, value: string) => Promise<void>
    createID: () => Promise<string>
    domain: string
}) {
    const { createID, setKey, domain } = options
    return async function createURL(url: string): Promise<ShortURL> {
        const id = await createID()
        await setKey(id, url)

        return {
            id,
            url,
            shortURL: `${domain}/${id}`,
        }
    }
}
