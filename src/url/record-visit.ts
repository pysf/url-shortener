export function buildRecordVisit(options: {
    incrKey: (key: string) => Promise<void>
    keyPrefix: string
}) {
    const { incrKey, keyPrefix } = options
    return async function recordVisit(id: string): Promise<void> {
        await incrKey(`${keyPrefix}-${id}`)
    }
}
