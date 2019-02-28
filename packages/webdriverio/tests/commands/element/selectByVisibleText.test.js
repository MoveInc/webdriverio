import request from 'request'
import { remote } from '../../../src'
import { ELEMENT_KEY } from '../../../src/constants'
import * as utils from '../../../src/utils'

describe('selectByVisibleText test', () => {
    const getElementFromResponseSpy = jest.spyOn(utils, 'getElementFromResponse')
    let browser
    let elem

    beforeEach(async () => {
        browser = await remote({
            baseUrl: 'http://foobar.com',
            capabilities: {
                browserName: 'foobar'
            }
        })
        elem = await browser.$('some-elem-123')
    })

    afterEach(() => {
        request.mockClear()
        getElementFromResponseSpy.mockClear()
    })

    it('should select value by visible text', async () => {
        await elem.selectByVisibleText(' someValue1 ')

        expect(request.mock.calls[1][0].uri.path).toBe('/wd/hub/session/foobar-123/element')
        expect(request.mock.calls[2][0].uri.path).toBe('/wd/hub/session/foobar-123/element/some-elem-123/element')
        expect(request.mock.calls[2][0].body.value).toBe('./option[. = "someValue1"]|./optgroup/option[. = "someValue1"]')
        expect(request.mock.calls[3][0].uri.path).toBe('/wd/hub/session/foobar-123/element/some-sub-elem-321/click')
        expect(getElementFromResponseSpy).toBeCalledWith({
            [ELEMENT_KEY]: 'some-sub-elem-321'
        })
    })

    it('should select value by visible text with spaces', async () => {
        await elem.selectByVisibleText('some Value1')

        expect(request.mock.calls[1][0].uri.path).toBe('/wd/hub/session/foobar-123/element')
        expect(request.mock.calls[2][0].uri.path).toBe('/wd/hub/session/foobar-123/element/some-elem-123/element')
        expect(request.mock.calls[2][0].body.value).toBe('./option[. = "some Value1"]|./optgroup/option[. = "some Value1"]')
        expect(request.mock.calls[3][0].uri.path).toBe('/wd/hub/session/foobar-123/element/some-sub-elem-321/click')
        expect(getElementFromResponseSpy).toBeCalledWith({
            [ELEMENT_KEY]: 'some-sub-elem-321'
        })
    })

    it('should select value by visible text with leading and trailing white-space', async () => {
        await elem.selectByVisibleText(' someValue1 ')

        expect(request.mock.calls[1][0].uri.path).toBe('/wd/hub/session/foobar-123/element')
        expect(request.mock.calls[2][0].uri.path).toBe('/wd/hub/session/foobar-123/element/some-elem-123/element')
        expect(request.mock.calls[2][0].body.value).toBe('./option[. = "someValue1"]|./optgroup/option[. = "someValue1"]')
        expect(request.mock.calls[3][0].uri.path).toBe('/wd/hub/session/foobar-123/element/some-sub-elem-321/click')
        expect(getElementFromResponseSpy).toBeCalledWith({
            [ELEMENT_KEY]: 'some-sub-elem-321'
        })
    })

    it('should select value by visible text with sequences of whitespace characters', async () => {
        await elem.selectByVisibleText('some    Value1')

        expect(request.mock.calls[1][0].uri.path).toBe('/wd/hub/session/foobar-123/element')
        expect(request.mock.calls[2][0].uri.path).toBe('/wd/hub/session/foobar-123/element/some-elem-123/element')
        expect(request.mock.calls[2][0].body.value).toBe('./option[. = "some Value1"]|./optgroup/option[. = "some Value1"]')
        expect(request.mock.calls[3][0].uri.path).toBe('/wd/hub/session/foobar-123/element/some-sub-elem-321/click')
        expect(getElementFromResponseSpy).toBeCalledWith({
            [ELEMENT_KEY]: 'some-sub-elem-321'
        })
    })

    it('should select value by visible text with quotes', async () => {
        await elem.selectByVisibleText('"someValue1""')

        expect(request.mock.calls[1][0].uri.path).toBe('/wd/hub/session/foobar-123/element')
        expect(request.mock.calls[2][0].uri.path).toBe('/wd/hub/session/foobar-123/element/some-elem-123/element')
        expect(request.mock.calls[2][0].body.value).toBe('./option[. = concat("", \'"\', "someValue1", \'"\', "", \'"\', "")]|./optgroup/option[. = concat("", \'"\', "someValue1", \'"\', "", \'"\', "")]')
        expect(request.mock.calls[3][0].uri.path).toBe('/wd/hub/session/foobar-123/element/some-sub-elem-321/click')
        expect(getElementFromResponseSpy).toBeCalledWith({
            [ELEMENT_KEY]: 'some-sub-elem-321'
        })
    })

    it('should convert number to string when selecting', async () => {
        await elem.selectByVisibleText(123)

        expect(request.mock.calls[1][0].uri.path).toBe('/wd/hub/session/foobar-123/element')
        expect(request.mock.calls[2][0].uri.path).toBe('/wd/hub/session/foobar-123/element/some-elem-123/element')
        expect(request.mock.calls[2][0].body.value).toBe('./option[. = "123"]|./optgroup/option[. = "123"]')
        expect(request.mock.calls[3][0].uri.path).toBe('/wd/hub/session/foobar-123/element/some-sub-elem-321/click')
        expect(getElementFromResponseSpy).toBeCalledWith({
            [ELEMENT_KEY]: 'some-sub-elem-321'
        })
    })
})
