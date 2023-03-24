/** @jsxImportSource theme-ui */
import React, { useMemo } from 'react'
import { Button, Flex, Text } from '@ape.swap/uikit'
import Bnb from './grayChains/bnb'
import Poly from './grayChains/poly'
import Tlos from './grayChains/Tlos'
import Arbitrum from './grayChains/Arbitrum'
import { styles } from './styles'
import { Box } from 'theme-ui'
import { useHomepageStats } from 'state/hooks'
import CountUp from 'react-countup'
import { useTranslation } from 'contexts/Localization'
import { Link, useHistory } from 'react-router-dom'
import { ChainId } from '@ape.swap/sdk'
import { slidesData } from '../WelcomeContent'
import useSelectNetwork from 'hooks/useSelectNetwork'

const DefiRedefined = () => {
  const rawStats = useHomepageStats()
  const { t } = useTranslation()
  const { imageCount } = slidesData[0]
  const { switchNetwork } = useSelectNetwork()
  const history = useHistory()

  const randomImage = useMemo(() => {
    return Math.floor(Math.random() * (imageCount + 1))
  }, [imageCount])

  const handleNetworkSwitch = (chainId: ChainId) => {
    history.push('/treasury-bills')
    switchNetwork(chainId)
  }

  return (
    <Flex sx={styles.slideContainer}>
      <Text sx={styles.slideTitle}>{t('DeFi, Redefined')}</Text>
      <Text sx={styles.slideSubtitle}>
        {t('Join our growing network of')}{' '}
        {rawStats?.bondingPartnerCount && (
          <Text sx={styles.counterText}>
            <CountUp end={rawStats?.bondingPartnerCount} decimals={0} duration={3} />{' '}
          </Text>
        )}
        {t('communities that are building project-owned liquidity through Treasury Bills.')}
      </Text>
      <Flex sx={{ alignItems: 'center', marginTop: ['25px', '25px', '30px'] }}>
        <Text sx={styles.availableBills}>{t('BILLS AVAILABLE ON')}</Text>
        <Bnb sx={{ marginRight: '10px', cursor: 'pointer' }} onClick={() => handleNetworkSwitch(ChainId.BSC)} />
        <Poly sx={{ marginRight: '10px', cursor: 'pointer' }} onClick={() => handleNetworkSwitch(ChainId.MATIC)} />
        <Tlos sx={{ marginRight: '10px', cursor: 'pointer' }} onClick={() => handleNetworkSwitch(ChainId.TLOS)} />
        <Arbitrum sx={{ cursor: 'pointer' }} onClick={() => handleNetworkSwitch(ChainId.ARBITRUM)} />
      </Flex>
      <Link to="/treasury-bills">
        <Flex sx={styles.billImage}>
          <Box sx={{ ...styles.image, backgroundImage: `url('/images/homepage/treasury-bills-${randomImage}.jpg')` }} />
        </Flex>
      </Link>
      <Flex sx={styles.buttonContainer}>
        <Button
          variant="secondary"
          sx={styles.learnMoreButton}
          onClick={() =>
            window.open(
              'https://apeswap.gitbook.io/apeswap-finance/product-and-features/raise/treasury-bills',
              '_blank',
            )
          }
        >
          {t('Learn more')}
        </Button>
        <Link to="/treasury-bills">
          <Button sx={{ fontSize: ['14px', '14px', '16px'], width: ['125px', '138px'] }}>{t('Buy a bill')}</Button>
        </Link>
      </Flex>
    </Flex>
  )
}

export default DefiRedefined
