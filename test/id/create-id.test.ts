import { buildCreateID } from '../../src/id/create-id'

describe('create-id module', () => {
    describe('create an a unique id by using incremental counter', () => {
        describe('given a CounterRange', () => {
            it('must return a base62 id', async () => {
                const loadRange = jest.fn(() => Promise.resolve())

                const createID = buildCreateID({
                    loadRange,
                    counterRange: {
                        start: 1,
                        current: 1,
                        end: 1000,
                    },
                })

                const id = await createID()
                expect(loadRange.mock.calls.length).toBe(0)
                expect(id).not.toBe('')
            })
        })

        describe('given a CounterRange for the first time', () => {
            it('must call loadRange and return a base62 id', async () => {
                const loadRange = jest.fn(() => Promise.resolve())

                const createID = buildCreateID({
                    loadRange,
                    counterRange: {
                        start: 0,
                        current: 0,
                        end: 1000,
                    },
                })

                const id = await createID()
                expect(loadRange.mock.calls.length).toBe(1)
                expect(id).not.toBe('')
            })
        })

        describe('given a full CounterRange', () => {
            it('must call reloadRange and return a base62 id', async () => {
                const loadRange = jest.fn(() => Promise.resolve())

                const createID = buildCreateID({
                    loadRange,
                    counterRange: {
                        start: 0,
                        current: 999,
                        end: 1000,
                    },
                })

                const id = await createID()
                expect(loadRange.mock.calls.length).toBe(1)
                expect(id).not.toBe('')
            })
        })
    })
})
