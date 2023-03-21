/** @jsxImportSource theme-ui */
import React from 'react'
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

const DefiRedefined = () => {
  const rawStats = useHomepageStats()
  const { t } = useTranslation()

  return (
    <Flex sx={styles.slideContainer}>
      <Text sx={styles.slideTitle}>{t('DeFi, Redefined')}</Text>
      <Text sx={styles.slideSubtitle}>
        {t('Join our growing network of')}{' '}
        {rawStats?.partnerCount && (
          <Text sx={styles.counterText}>
            <CountUp end={rawStats?.partnerCount} decimals={0} duration={1} separator="," />{' '}
          </Text>
        )}
        {t('communities that are building project-owned liquidity through Treasury Bills.')}
      </Text>
      <Flex sx={{ alignItems: 'center', marginTop: ['25px', '25px', '30px'] }}>
        <Text sx={styles.availableBills}>{t('BILLS AVAILABLE ON')}</Text>
        <Bnb sx={{ marginRight: '10px' }} />
        <Poly sx={{ marginRight: '10px' }} />
        <Tlos sx={{ marginRight: '10px' }} />
        <Arbitrum />
      </Flex>
      <Flex sx={styles.billImage}>
        <Box sx={{ ...styles.image, backgroundImage: `url('/images/homepage-0.jpg')` }} />
      </Flex>
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
          <Button sx={{ fontSize: ['16px', '14px', '18px'], width: '137px' }}>{t('Buy a bill')}</Button>
        </Link>
      </Flex>
    </Flex>
  )
}

export default DefiRedefined
