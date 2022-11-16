import { useHistory } from 'react-router-dom'
import { NETWORK_LABEL } from 'config/constants/chains'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { DOC_LINKS, Farms, routeNames } from 'config/constants'

export const useRouteLinks = () => {
  const history = useHistory()
  const { pathname } = history.location
  const { chainId } = useActiveWeb3React()
  const networkLabel = NETWORK_LABEL[chainId]
  const farmTypes = Farms[networkLabel]

  DOC_LINKS['FARMS'] = `https://apeswap.gitbook.io/apeswap-finance/product-and-features/stake/farms/${farmTypes}`

  const link: string = DOC_LINKS[routeNames[pathname]] ?? null

  return { link }
}
