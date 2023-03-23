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
import { Link } from 'react-router-dom'
import { ChainId } from '@ape.swap/sdk'
import { slidesData } from '../WelcomeContent'

const DefiRedefined = () => {
  const rawStats = useHomepageStats()
  const { t } = useTranslation()
  const { imageCount } = slidesData[0]

  const randomImage = useMemo(() => {
    return Math.floor(Math.random() * (imageCount + 1))
  }, [imageCount])

  return (
    <Flex sx={styles.slideContainer}>
      <Text sx={styles.slideTitle}>{t('DeFi, Redefined')}</Text>
      <Text sx={styles.slideSubtitle}>
        {t('Join our growing network of')}{' '}
        {rawStats?.bondingPartnerCount && (
          <Text sx={styles.counterText}>
            <CountUp end={rawStats?.bondingPartnerCount} decimals={0} duration={1} separator="," />{' '}
          </Text>
        )}
        {t('communities that are building project-owned liquidity through Treasury Bills.')}
      </Text>
      <Flex sx={{ alignItems: 'center', marginTop: ['25px', '25px', '30px'] }}>
        <Text sx={styles.availableBills}>{t('BILLS AVAILABLE ON')}</Text>
        <Link to={`/treasury-bills?chain=${ChainId.BSC}`}>
          <Bnb sx={{ marginRight: '10px' }} />
        </Link>
        <Link to={`/treasury-bills?chain=${ChainId.MATIC}`}>
          <Poly sx={{ marginRight: '10px' }} />
        </Link>
        <Link to={`/treasury-bills?chain=${ChainId.TLOS}`}>
          <Tlos sx={{ marginRight: '10px' }} />
        </Link>
        <Link to={`/treasury-bills?chain=${ChainId.ARBITRUM}`}>
          <Arbitrum />
        </Link>
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
          <Button sx={{ fontSize: ['14px', '14px', '16px'], width: '138px' }}>{t('Buy a bill')}</Button>
        </Link>
      </Flex>
    </Flex>
  )
}

export default DefiRedefined
