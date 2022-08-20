import { buildCreateURL } from '../../src/url/create-url'

describe('url module', () => {
    describe('create a shorturl and save it in key value store', () => {
        describe('given a valid URL ', () => {
            it('must return an ShortURL ', async () => {
                console.log('....')
                const id = '5Yep'
                const domain = 'example.com'

                const createID = jest.fn(() => Promise.resolve(id))
                const setKey = jest.fn((k: string, v: string) =>
                    Promise.resolve()
                )

                const createURL = buildCreateURL({
                    createID,
                    domain,
                    setKey,
                })

                const url = 'http://google.com/search/index.html'
                const got = await createURL(url)

                expect(got).toEqual({
                    id,
                    url,
                    shortURL: `${domain}/${id}`,
                })
                expect(createID.mock.calls.length).toBe(1)
                expect(setKey.mock.calls.length).toBe(1)
                expect(setKey.mock.calls[0][0]).toBe(id)
                expect(setKey.mock.calls[0][1]).toBe(url)
            })
        })
    })
})
