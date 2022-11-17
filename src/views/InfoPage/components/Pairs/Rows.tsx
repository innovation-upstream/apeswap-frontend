/** @jsxImportSource theme-ui */
import { ChainId } from '@ape.swap/sdk'
import { Flex, Text } from '@ape.swap/uikit'
import { CurrencyLogo } from 'components/Logo'
import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import { useTranslation } from 'contexts/Localization'
import useIsMobile from 'hooks/useIsMobile'
import React from 'react'
import CountUp from 'react-countup'
import { useFetchInfoNativePrice, useFetchInfoTokensData } from 'state/info/hooks'
import { Pairs, Token } from 'state/info/types'
import { Grid, Image } from 'theme-ui'
import getTokenLogoURL from 'utils/getTokenLogoURL'

const Rows = ({ pairs, activeIndex }: { pairs: Pairs[]; activeIndex: number }) => {
  const { t } = useTranslation()
  const mobile = useIsMobile()

  return (
    <Flex
      sx={{
        width: '100%',
        maxWidth: '1200px',
        height: '500px',
        flexDirection: 'column',
        overflowX: 'scroll',
        overflowY: 'hidden',
        '-ms-overflow-style': 'none',
        scrollbarWidth: 'none',
        '::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <Grid
        gap="0px"
        columns={[`.25fr .25fr ${mobile ? '1.5fr' : '3fr'} 1.25fr 1.5fr 1.5fr`]}
        sx={{ minHeight: '40px', alignItems: 'center', minWidth: '700px' }}
      >
        <span />
        <Text>#</Text>
        <Text size="14px" weight={700} sx={{ alignSelf: 'center' }}>
          {t('Pair')}
        </Text>{' '}
        <Text size="14px" weight={700} sx={{ alignSelf: 'center' }}>
          {t('Liquidity')}
        </Text>
        <Text size="14px" weight={700} sx={{ alignSelf: 'center' }}>
          {t('Volume (24hs)')}
        </Text>
        <Text size="14px" weight={700} sx={{ alignSelf: 'center' }}>
          {t('Volume (7d)')}
        </Text>
        <span />
      </Grid>
      <Flex sx={{ flexDirection: 'column', height: '500px' }}>
        {pairs.map(({ id, chainId, volumeUSD, reserveUSD, token0, token1 }, index) => {
          console.log(reserveUSD)
          // const currentNativePrice = parseFloat(nativePrice[chainId]?.data.ethPrice)
          // const currentAssetPrice = currentNativePrice * parseFloat(derivedETH)
          // const currentAssetLiquidity = parseFloat(totalLiquidity) * currentNativePrice * parseFloat(derivedETH)
          return (
            <Grid
              key={id}
              gap="0px"
              columns={[`.25fr .25fr ${mobile ? '1.5fr' : '3fr'} 1.25fr 1.5fr 1.5fr`]}
              sx={{
                background: index % 2 === 0 ? 'white3' : 'white2',
                height: '40px',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '700px',
              }}
            >
              <span />
              <Flex>
                <Text size="14px" weight={400}>
                  {index + 1 + activeIndex}
                </Text>
              </Flex>
              <Flex sx={{ alignItems: 'center' }}>
                <ServiceTokenDisplay token1={token0.symbol} token2={token1.symbol} noEarnToken size={20} />
                <Text size="14px" weight={400} ml="10px">
                  {token0.symbol} - {token1.symbol}
                </Text>
              </Flex>
              <Flex>
                <Text size="14px" weight={400}>
                  $
                  <CountUp
                    start={parseFloat(reserveUSD)}
                    end={parseFloat(reserveUSD)}
                    decimals={3}
                    duration={0}
                    separator=","
                  />
                </Text>
              </Flex>
              <Flex>
                <Text size="14px" weight={400}>
                  $
                  <CountUp start={parseFloat(volumeUSD)} end={parseFloat(volumeUSD)} duration={0} separator="," />{' '}
                </Text>
              </Flex>
              <Flex>
                <Text size="14px" weight={400}>
                  $
                  <CountUp start={parseFloat(volumeUSD)} end={parseFloat(volumeUSD)} duration={0} separator="," />{' '}
                </Text>
              </Flex>
            </Grid>
          )
        })}
      </Flex>
    </Flex>
  )
}

export default React.memo(Rows)
