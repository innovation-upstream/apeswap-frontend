/** @jsxImportSource theme-ui */
import React from 'react'
import { useHistory } from 'react-router-dom'
import { Flex, Svg } from '@ape.swap/uikit'
import { FloatingDocsProps } from './types'

export const FloatingDocs: React.FC<FloatingDocsProps> = ({ iconProps, ...props }) => {
  const history = useHistory()
  const { pathname } = history.location

  const JUNGLE_FARMS = pathname.includes('jungle-farms')
  const FARMS = pathname.includes('banana-farms') || pathname.includes('farms')
  const DEX = pathname.includes('swap')
  const POOLS = pathname.includes('pools')
  const MAXIMIZERS_VAULTS = pathname.includes('maximizers')
  const LIQUIDITY = pathname.includes('liquidity') || pathname.includes('zap') || pathname.includes('migrate')
  const ORDERS = pathname.includes('orders')
  const IAO = pathname.includes('iao')
  const GNANA = pathname.includes('gnana')
  const TREASURY_BILL = pathname.includes('treasury-bills')

  // LENDING ROUTE isn't on this frontend project
  // console.log('lendingRoute:::', LENDING)

  const link =
    JUNGLE_FARMS || FARMS
      ? 'https://apeswap.gitbook.io/apeswap-finance/product-and-features/stake/farms'
      : DEX
      ? 'https://apeswap.gitbook.io/apeswap-finance/product-and-features/exchange/swap'
      : POOLS
      ? 'https://apeswap.gitbook.io/apeswap-finance/product-and-features/stake/pools'
      : MAXIMIZERS_VAULTS
      ? 'https://apeswap.gitbook.io/apeswap-finance/product-and-features/stake/banana-maximizers'
      : LIQUIDITY
      ? 'https://apeswap.gitbook.io/apeswap-finance/product-and-features/exchange/liquidity'
      : ORDERS
      ? 'https://apeswap.gitbook.io/apeswap-finance/product-and-features/exchange/limit-orders'
      : IAO
      ? 'https://apeswap.gitbook.io/apeswap-finance/product-and-features/raise/self-serve-iao-ss-iao'
      : GNANA
      ? 'https://apeswap.gitbook.io/apeswap-finance/welcome/apeswap-tokens/gnana'
      : TREASURY_BILL
      ? 'https://apeswap.gitbook.io/apeswap-finance/product-and-features/raise/treasury-bills'
      : null

  return link ? (
    <Flex
      sx={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '40px',
        height: '40px',
        zIndex: 5,
        cursor: 'pointer',
      }}
      onClick={() => window.open(link, '_blank')}
      {...props}
    >
      <Svg icon="docs" color="primaryBright" {...iconProps} />
    </Flex>
  ) : null
}

export default FloatingDocs
