export function buildQueryURL(options: {
    getKey: (key: string) => Promise<string | null>
    recordVisit: (key: string) => Promise<void>
}) {
    const { getKey, recordVisit } = options
    return async function queryURL(shortURL: string): Promise<string | null> {
        const result = shortURL.match(
            /https?:\/\/([a-zA-Z0-9].?)*\/([a-zA-Z0-9]*)/
        )
        if (!result) {
            return null
        }

        const id = result[2]
        if (!id) {
            return null
        }

        const longURL = await getKey(id)
        if (longURL != null) {
            await recordVisit(id)
        }

        return longURL
    }
}
