import { Etcd3 } from 'etcd3'
import { buildLoadRange } from './load-range'
import { CounterRange } from './type'
import config from 'config'

const counterRange: CounterRange = {
    current: 0,
    end: 0,
    start: 0,
}

const etcd = new Etcd3({
    hosts: config.get('ETCD_HOSTS'),
})

const loadRange = buildLoadRange({
    counterRange: counterRange,
    etcd,
    lockResource: config.get('LOCK_RESOURCE'),
    counterResource: config.get('COUNTER_RESOURCE'),
    rangeSize: config.get('COUNTER_RANGE'),
})

export { counterRange, loadRange }
