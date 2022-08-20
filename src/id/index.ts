import { buildCreateID } from './create-id'
import { loadRange, counterRange } from '../counter-range'

const createID = buildCreateID({
    counterRange,
    loadRange,
})

export { createID }
