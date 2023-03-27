/** @jsxImportSource theme-ui */
import React from 'react'
import { styles } from './styles'
import { Button, Flex, Text } from '@ape.swap/uikit'
import { Link, useHistory } from 'react-router-dom'
import { ChainId } from '@ape.swap/sdk'
import Bnb from './grayChains/bnb'
import Poly from './grayChains/poly'
import Tlos from './grayChains/Tlos'
import Arbitrum from './grayChains/Arbitrum'
import { Box, Image } from 'theme-ui'
import { useTranslation } from 'contexts/Localization'
import useSelectNetwork from 'hooks/useSelectNetwork'

const ApeSwapV3 = () => {
  const { t } = useTranslation()
  const { switchNetwork } = useSelectNetwork()
  const history = useHistory()

  const handleNetworkSwitch = (chainId: ChainId) => {
    history.push('/add-liquidity')
    switchNetwork(chainId)
  }

  return (
    <Flex sx={styles.slideContainer}>
      <Flex sx={styles.slideContent}>
        <Text sx={{ ...styles.slideTitle, fontSize: ['42px', '42px', '54px'], lineHeight: ['48px', '48px', '74px'] }}>
          {t('Apeswap Liquidity V3')}
        </Text>
        <Text sx={styles.slideSubtitle}>
          {t('Insert text about Liquidity V3 here, please dont make it super long.')}
        </Text>
        <Flex sx={{ alignItems: 'center', marginTop: ['25px', '25px', '30px'] }}>
          <Text sx={styles.availableBills}>{t('AVAILABLE ON')}</Text>
          <Bnb sx={{ marginRight: '10px', cursor: 'pointer' }} onClick={() => handleNetworkSwitch(ChainId.BSC)} />
          <Poly sx={{ marginRight: '10px', cursor: 'pointer' }} onClick={() => handleNetworkSwitch(ChainId.MATIC)} />
          <Tlos sx={{ marginRight: '10px', cursor: 'pointer' }} onClick={() => handleNetworkSwitch(ChainId.TLOS)} />
          <Arbitrum sx={{ cursor: 'pointer' }} onClick={() => handleNetworkSwitch(ChainId.ARBITRUM)} />
        </Flex>
        <Link to="/add-liquidity">
          <Flex sx={styles.billImage}>
            <Box sx={{ ...styles.image, backgroundImage: `url('/images/homepage/add-liquidity-0.png')` }} />
          </Flex>
        </Link>
        <Flex sx={styles.buttonContainer}>
          <Button
            variant="secondary"
            sx={{ ...styles.learnMoreButton }}
            onClick={() =>
              window.open(
                'https://apeswap.gitbook.io/apeswap-finance/product-and-features/exchange/liquidity/how-to-add-liquidity',
                '_blank',
              )
            }
          >
            {t('Learn more')}
          </Button>
          <Link to="/add-liquidity">
            <Button sx={{ fontSize: ['14px', '14px', '16px'], minWidth: ['140px', '140px'] }}>
              {t('Add liquidity')}
            </Button>
          </Link>
        </Flex>
      </Flex>
      <Flex sx={{ width: ['0', '100%'], justifyContent: 'center' }}>
        <Flex sx={{ ...styles.imageWrapper, background: 'none' }} onClick={() => history.push(`/treasury-bills`)}>
          <Image src={`/images/homepage/add-liquidity-0.png`} sx={styles.image} />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ApeSwapV3
