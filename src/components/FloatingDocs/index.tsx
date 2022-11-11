/** @jsxImportSource theme-ui */
import React from 'react'
import { Flex, Svg } from '@ape.swap/uikit'
import { FloatingDocsProps } from './types'

export const FloatingDocs: React.FC<FloatingDocsProps> = ({ iconProps, ...props }) => {
  let link: string
  const JUNGLE_FARMS = window.location.pathname.includes('jungle-farms')
  const FARMS = window.location.pathname.includes('banana-farms' || 'farms')
  const DEX = window.location.pathname.includes('swap')
  const POOLS = window.location.pathname.includes('pools')
  const MAXIMIZERS_VAULTS = window.location.pathname.includes('maximizers')
  const LIQUIDITY = window.location.pathname.includes('add' || 'remove' || 'zap')
  const ORDERS = window.location.pathname.includes('orders')
  const IAO = window.location.pathname.includes('iao')
  const GNANA = window.location.pathname.includes('gnana')
  const TREASURY_BILL = window.location.pathname.includes('treasury-bills')

  // LENDING ROUTE isn't on this frontend project
  // const LENDING = window.location.protocol.includes('lending')
  // console.log('lendingRoute:::', LENDING)

  const routes = [JUNGLE_FARMS, FARMS, DEX, POOLS, MAXIMIZERS_VAULTS, LIQUIDITY, ORDERS, IAO, GNANA, TREASURY_BILL]

  switch (routes) {
    case routes['JUNGLE_FARMS']:
      link = null
      break
    case routes['FARMS']:
      link = null
      break
    case routes['DEX']:
      link = null
      break
    case routes['POOLS']:
      link = null
      break
    case routes['MAXIMIZERS_VAULTS']:
      link = null
      break
    case routes['LIQUIDITY']:
      link = null
      break
    case routes['ORDERS']:
      link = null
      break
    case routes['IAO']:
      link = null
      break
    case routes['GNANA']:
      link = null
      break
    case routes['TREASURY_BILL']:
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
