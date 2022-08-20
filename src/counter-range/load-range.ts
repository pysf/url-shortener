import { Etcd3 } from 'etcd3'
import { CounterRange } from './type'

export function buildLoadRange(options: {
    etcd: Etcd3
    lockResource: string
    counterResource: string
    counterRange: CounterRange
    rangeSize: number
}) {
    const { counterRange, etcd, lockResource, counterResource, rangeSize } =
        options

    return async function loadRange() {
        const lock = etcd.lock(lockResource)
        await lock.acquire()
        let lastCounter = await etcd.get(counterResource).number()
        lastCounter = lastCounter || 0

        counterRange.start = lastCounter + 1
        counterRange.current = lastCounter + 1
        counterRange.end = lastCounter + rangeSize

        await etcd.put(counterResource).value(counterRange.end)
        await lock.release()
    }
}
