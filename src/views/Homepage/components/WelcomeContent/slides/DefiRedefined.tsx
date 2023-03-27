/** @jsxImportSource theme-ui */
import React, { useMemo } from 'react'
import { Button, Flex, Text } from '@ape.swap/uikit'
import Bnb from './grayChains/bnb'
import Poly from './grayChains/poly'
import Tlos from './grayChains/Tlos'
import Arbitrum from './grayChains/Arbitrum'
import { styles } from './styles'
import { Box, Image } from 'theme-ui'
import { useHomepageStats } from 'state/hooks'
import CountUp from 'react-countup'
import { useTranslation } from 'contexts/Localization'
import { Link, useHistory } from 'react-router-dom'
import { ChainId } from '@ape.swap/sdk'
import useSelectNetwork from 'hooks/useSelectNetwork'

const DefiRedefined = () => {
  const rawStats = useHomepageStats()
  const { t } = useTranslation()
  const { switchNetwork } = useSelectNetwork()
  const history = useHistory()

  const randomImage = useMemo(() => {
    // this function returns a random number between 1 and 10, which is the amount of bill images
    return Math.floor(Math.random() * (10 + 1))
  }, [])

  const handleNetworkSwitch = (chainId: ChainId) => {
    history.push('/treasury-bills')
    switchNetwork(chainId)
  }

  return (
    <Flex sx={styles.slideContainer}>
      <Flex sx={styles.slideContent}>
        <Text sx={styles.slideTitle}>{t('DeFi, Redefined')}</Text>
        <Text sx={styles.slideSubtitle}>
          {t('Join our growing network of')}{' '}
          {rawStats?.bondingPartnerCount && (
            <Text sx={styles.counterText}>
              <CountUp end={rawStats?.bondingPartnerCount} decimals={0} duration={3} separator="," />{' '}
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
            <Box
              sx={{ ...styles.image, backgroundImage: `url('/images/homepage/treasury-bills-${randomImage}.jpg')` }}
            />
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
      <Flex sx={{ width: ['0', '100%'], justifyContent: 'center' }}>
        <Flex sx={{ ...styles.imageWrapper, background: 'lvl1' }} onClick={() => history.push(`/treasury-bills`)}>
          <Image src={`/images/homepage/treasury-bills-${randomImage}.jpg`} sx={styles.image} />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default DefiRedefined
