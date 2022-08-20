import { CounterRange } from '../counter-range/type'

export function buildCreateID(options: {
    counterRange: CounterRange
    loadRange: () => Promise<void>
}) {
    const base62Range =
        '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    const { counterRange, loadRange } = options

    return async function createID(): Promise<string> {
        if (
            counterRange.current < counterRange.end - 1 &&
            counterRange.current != 0
        ) {
            counterRange.current++
        } else {
            await loadRange()
            counterRange.current++
        }

        let id = ''
        let n = counterRange.current
        while (n > 0) {
            id += base62Range[n % 62]
            n = Math.floor(n / 62)
        }

        return id
    }
}
