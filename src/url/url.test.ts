import { buildCreateURL } from './create-url'

describe('url', () => {
    describe('test createURL', () => {
        describe('given a valid URL ', () => {
            it('must save the short url and return an ShortURL ', async () => {
                console.log('....')
                const id = '5Yep'
                const domain = 'example.com'

                const createID = jest.fn(() => Promise.resolve(id))
                const setKey = jest.fn(() => Promise.resolve())

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
            })
        })
    })
})
