import { GetServerSidePropsContext } from 'next'
import Cookies from 'universal-cookie'
import absoluteUrl from 'next-absolute-url'
import { CHAIN_ID } from 'config/constants/chains'
import { setNetwork } from 'state/network'
import { getSelectorsByUserAgent } from 'react-device-detect'
import Store from 'state'

export const getServerSideGenericProps = async (
  context: GetServerSidePropsContext & { store?: typeof Store },
): Promise<{ props: any }> => {
  const { req } = context
  context.res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=120')
  const cookies = new Cookies(req.cookies)
  const account = cookies.get('account')
  const chainIdStr = cookies.get('chainIdStatus')
  const chainId = chainIdStr ? parseInt(chainIdStr) : CHAIN_ID.BSC
  context.store?.dispatch(setNetwork({ chainId }))
  const { isDesktop } = getSelectorsByUserAgent(req.headers['user-agent'])
  const { origin } = absoluteUrl(req)

  const CACHE_KEY = 'IS_DARK'
  const cachedMode = cookies.get(CACHE_KEY) || 'false'
  const colorMode = JSON.parse(cachedMode) ? 'dark' : 'light'

  if (!chainIdStr) {
    cookies.set('chainIdStatus', chainId.toString())
  }

  return {
    props: JSON.parse(
      JSON.stringify({
        account,
        chainId,
        isDesktop,
        origin,
        colorMode,
      }),
    ),
  }
}
