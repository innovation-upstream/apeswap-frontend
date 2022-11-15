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

  const routes = [JUNGLE_FARMS, FARMS, DEX, POOLS, MAXIMIZERS_VAULTS, LIQUIDITY, ORDERS, IAO, GNANA, TREASURY_BILL]
  let link: string

  switch (routes) {
    case routes['JUNGLE_FARMS'] || routes['FARMS']:
      link = 'https://apeswap.gitbook.io/apeswap-finance/product-and-features/stake/farms'
      break
    case routes['MAXIMIZERS_VAULTS']:
      link = 'https://apeswap.gitbook.io/apeswap-finance/product-and-features/stake/vaults'
      break
    case routes['IAO']:
      link = 'https://apeswap.gitbook.io/apeswap-finance/product-and-features/raise/self-serve-iao-ss-iao'
      break
    case routes['GNANA']:
      link = 'https://apeswap.gitbook.io/apeswap-finance/welcome/apeswap-tokens/gnana'
      break
    case routes['TREASURY_BILL']:
      link = 'https://apeswap.gitbook.io/apeswap-finance/product-and-features/raise/treasury-bills'
      break
    case routes['DEX']:
      link = null
      break
    case routes['POOLS']:
      link = null
      break
    case routes['LIQUIDITY']:
      link = null
      break
    case routes['ORDERS']:
      link = null
      break
    default:
      link = null
  }

  if (link)
    return (
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
    )
  return null
}

export default FloatingDocs
