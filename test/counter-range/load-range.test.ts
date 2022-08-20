import { Etcd3 } from 'etcd3'
import { buildLoadRange } from '../../src/counter-range/load-range'

describe('counter-range module', () => {
    describe('load-range reads last counter from Etcd and refresh counterRange value', () => {
        describe('given a call', () => {
            it('must update counterRange ', async () => {
                const releaseLockFn = jest.fn((): Promise<void> => {
                    return Promise.resolve()
                })

                const acquireLockFn = jest.fn((): Promise<void> => {
                    return Promise.resolve()
                })

                const lockFn = jest.fn((key: string): any => {
                    return {
                        release: releaseLockFn,
                        acquire: acquireLockFn,
                    }
                })

                const currentEtcdCounter = 9000
                const getFn = jest.fn((key: string): any => {
                    return {
                        number: jest.fn((): Promise<number> => {
                            return Promise.resolve(currentEtcdCounter)
                        }),
                    }
                })

                const valueFn = jest.fn((key: string): any => {
                    return Promise.resolve()
                })

                const putFn = jest.fn((key: string): any => {
                    return {
                        value: valueFn,
                    }
                })

                const etcdMock = {} as Etcd3
                etcdMock.lock = lockFn
                etcdMock.get = getFn
                etcdMock.put = putFn

                const counterRange = {
                    current: 999,
                    start: 0,
                    end: 1000,
                }

                const rangeSize = 1000
                const loadRange = buildLoadRange({
                    rangeSize: 1000,
                    counterResource: 'counter',
                    lockResource: 'lock',
                    counterRange,
                    etcd: etcdMock,
                })

                const expectedNewCounter = rangeSize + currentEtcdCounter

                await loadRange()

                // acquire the lock
                expect(lockFn.mock.calls.length).toBe(1)
                expect(acquireLockFn.mock.calls.length).toBe(1)
                expect(lockFn.mock.calls[0][0]).toBe('lock')

                // make sure current etcd counter is read from the etcd server
                expect(getFn.mock.calls.length).toBe(1)
                expect(getFn.mock.calls[0][0]).toBe('counter')

                // make sure new calulated counter is sent no nte etcd
                expect(putFn.mock.calls.length).toBe(1)
                expect(valueFn.mock.calls.length).toBe(1)
                expect(valueFn.mock.calls[0][0]).toBe(expectedNewCounter)

                // make sure lock is released
                expect(releaseLockFn.mock.calls.length).toBe(1)

                // verify if the range is set as expected
                expect(counterRange).toEqual({
                    current: 9001,
                    start: 9001,
                    end: expectedNewCounter,
                })
            })
        })
    })
})
