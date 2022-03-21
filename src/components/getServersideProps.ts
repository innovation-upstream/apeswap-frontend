import { GetServerSidePropsContext } from 'next'
import Cookies from 'universal-cookie'
import { CHAIN_ID } from 'config/constants/chains'

export const getServerSideGenericProps = async (context: GetServerSidePropsContext): Promise<{ props: any }> => {
  const { req } = context
  const cookies = new Cookies(req.cookies)
  const chainIdStr = cookies.get('chainIdStatus')
  const chainId = chainIdStr ? parseInt(chainIdStr) : CHAIN_ID.BSC
  if (!chainIdStr) {
    cookies.set('chainIdStatus', chainId.toString())
  }

  return {
    props: {
      chainId,
    },
  }
}
