import React, { useContext } from 'react'
import styled from 'styled-components'
import { Flex, Button, Tabs, Tab } from '@innovationupstream/apeswap-uikit'
import GlobalSettings from 'components/Menu/GlobalSettings'
import Link from 'next/link'
import { useTranslation } from 'contexts/Localization'
import { useRouter } from 'next/router'
import { SSRContext } from 'contexts/SSRContext'
import useIsMobile from 'hooks/useIsMobile'
import { LinkWrapper } from 'style/LinkWrapper'

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

const CurrencyInputHeader: React.FC<Props> = () => {
  const { isDesktop, isBrowser } = useContext(SSRContext)
  const isMobileView = useIsMobile()
  const isMobile = isBrowser ? isMobileView : !isDesktop
  const router = useRouter()
  const { t } = useTranslation()

  const getActiveTab = () => {
    const { pathname } = router
    if (pathname === '/swap') return 0
    if (pathname === '/orders') return 1
    return 2
  }

  return (
    <CurrencyInputContainer>
      <Tabs activeTab={getActiveTab()} size="md">
        <Tab
          index={0}
          label={t('SWAP')}
          onClick={() => router.push('/swap')}
          size={isMobile ? 'sm' : 'md'}
          variant="centered"
          activeTab={getActiveTab()}
        />
        <Tab
          index={1}
          label={t('ORDERS')}
          onClick={() => router.push('/orders')}
          size={isMobile ? 'sm' : 'md'}
          variant="centered"
          activeTab={getActiveTab()}
        />
        <Tab
          index={2}
          label={t('LIQUIDITY')}
          onClick={() => router.push('/pool')}
          size={isMobile ? 'sm' : 'md'}
          variant="centered"
          activeTab={getActiveTab()}
        />
      </Tabs>
      <Flex>
        <Link href="https://app.multichain.org/" passHref>
          <LinkWrapper target="_blank" rel="noopener noreferrer">
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
          </LinkWrapper>
        </Link>
        <GlobalSettings />
      </Flex>
    </CurrencyInputContainer>
  )
}

export default CurrencyInputHeader
