import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { Flex, Button, useMatchBreakpoints, Tabs, Tab } from '@innovationupstream/apeswap-uikit'
import GlobalSettings from 'components/Menu/GlobalSettings'
import { CHAIN_ID } from 'config/constants/chains'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useTranslation } from 'contexts/Localization'

interface Props {
  title?: string
  subtitle?: string
  noConfig?: boolean
  isChartDisplayed?: boolean
}

const CurrencyInputContainer = styled(Flex)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 25px 0px 20px;
  width: 100%;
  background: ${({ theme }) => theme.colors.navbar};
`

const LinkWrapper = styled.a`
  color: inherit;
  display: inline-block;
  z-index: 20;
  width: 100%;
`

const CurrencyInputHeader: React.FC<Props> = () => {
  const { isMd, isSm, isXs } = useMatchBreakpoints()
  const history = useRouter()
  const isMobile = isMd || isSm || isXs
  const { chainId } = useActiveWeb3React()
  const path = useRouter()
  const { t } = useTranslation()
  const getActiveTab = () => {
    const { pathname } = path
    if (pathname.includes('swap')) return 0
    if (pathname.includes('orders')) return 1
    return 2
  }

  return (
    <CurrencyInputContainer>
      <Tabs activeTab={getActiveTab()} size="md">
        <Tab
          index={0}
          label={t('SWAP')}
          onClick={() => history.push('/swap')}
          size={isMobile ? 'sm' : 'md'}
          variant="centered"
          activeTab={getActiveTab()}
        />
        {chainId === CHAIN_ID.BSC ? (
          <Tab
            index={1}
            label={t('ORDERS')}
            onClick={() => history.push('/orders')}
            size={isMobile ? 'xsm' : 'md'}
            variant="centered"
            activeTab={getActiveTab()}
          />
        ) : (
          <></>
        )}
        <Tab
          index={2}
          label={t('LIQUIDITY')}
          onClick={() => history.push('/pool')}
          size={isMobile ? 'sm' : 'md'}
          variant="centered"
          activeTab={getActiveTab()}
        />
      </Tabs>
      <Flex>
        <a href="https://app.multichain.org/" target="_blank" rel="noopener noreferrer">
          <Button
            style={{
              fontSize: '15px',
              fontWeight: 700,
              marginRight: '25px',
              marginLeft: '15px',
              padding: 10,
              display: isMobile ? 'none' : 'block',
              height: isMobile ? '36px ' : '40px',
            }}
          >
            {t('BRIDGE')}
          </Button>
        </a>
        <GlobalSettings />
      </Flex>
    </CurrencyInputContainer>
  )
}

export default CurrencyInputHeader
