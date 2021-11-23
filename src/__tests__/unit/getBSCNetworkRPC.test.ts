import { getBSCNetworkRPC } from '../../config/constants/chains'

const userAgentGetter = jest.spyOn(window.navigator, 'userAgent', 'get')

const pattern = /^((?!127.0.0.1:8545).)*$/
const localRPC = 'http://127.0.0.1:8545'

it('should return default rpc urls in browser', () => {
  expect(getBSCNetworkRPC()).toEqual(expect.arrayContaining([expect.stringMatching(pattern)]))
})

it('should return local rpc urls in snap', () => {
  userAgentGetter.mockReturnValue('ReactSnap')
  expect(getBSCNetworkRPC()).toEqual(expect.arrayContaining([localRPC]))
})
