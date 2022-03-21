import { GetServerSidePropsContext } from 'next'
import Cookies from 'universal-cookie'
import { CHAIN_ID } from 'config/constants/chains'
import { setNetwork } from 'state/network'
import Store from 'state'

type IStore = any

export const getServerSideGenericProps = async (
  context: GetServerSidePropsContext & { store?: IStore },
): Promise<{ props: any }> => {
  const { req } = context
  const cookies = new Cookies(req.cookies)
  const account = cookies.get('account')
  const chainIdStr = cookies.get('chainIdStatus')
  const chainId = chainIdStr ? parseInt(chainIdStr) : CHAIN_ID.BSC
  context.store?.dispatch(setNetwork({ chainId }))

  if (!chainIdStr) {
    cookies.set('chainIdStatus', chainId.toString())
  }

  return {
    props: JSON.parse(
      JSON.stringify({
        account,
        chainId,
      }),
    ),
  }
}
