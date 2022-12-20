/** @jsxImportSource theme-ui */
import React from 'react'
import { Flex, Text, TooltipBubble } from '@ape.swap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { CHAIN_PARAMS, NETWORK_LABEL } from 'config/constants/chains'
import { useTranslation } from 'contexts/Localization'
import { styles } from './styles'
import useIsMobile from '../../hooks/useIsMobile'

export const SwapSlides = () => {
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()
  const isMobile = useIsMobile()
  return [
    <Flex sx={styles.contentContainer} key={1}>
      <Text sx={styles.slideTitle}>{t('Select Tokens & Amount')}</Text>
      <Flex sx={{ flexWrap: 'wrap', mt: 2, ...styles.content }}>
        <Text>{t('Select the tokens you want to trade and enter your preferred amount.')}</Text>
        <Text sx={{ fontStyle: 'italic' }}>
          {t(`New to ${NETWORK_LABEL[chainId]} Chain? You might need to`)}
          <Text sx={{ ...styles.yellow, mx: '3px' }}>
            <a href="https://app.multichain.org/#/router" target="_blank" rel="noreferrer noopener">
              {t('bridge tokens')}
            </a>
          </Text>
          {t(`first. Always keep spare ${CHAIN_PARAMS[chainId]['nativeCurrency']['symbol']} to account for gas fees.`)}
        </Text>
      </Flex>
    </Flex>,
    <Flex sx={styles.contentContainer} key={1}>
      <Text sx={styles.slideTitle}>{t('Approve Router')}</Text>
      <Flex sx={{ flexWrap: 'wrap', mt: 2, ...styles.content }}>
        <Text>{t(`You'll need to APPROVE the router just once.`)}</Text>
        <Text sx={{ fontStyle: 'italic' }}>
          <Text sx={styles.content}>{t('Keep in mind ApeSwap uses three different routers (')}</Text>
          <TooltipBubble
            placement={'topRight'}
            transformTip={`translate(${isMobile ? '9%' : '5%'}, 2%)`}
            body={
              <Flex sx={styles.tipBody}>
                {t("ApeSwap's primary DEX router that facilitates token swaps through native liquidity sources.")}
              </Flex>
            }
            sx={{ width: ['190px', '190px', '350px'] }}
          >
            <Text sx={styles.tipTitle}>Ape,</Text>
          </TooltipBubble>{' '}
          <TooltipBubble
            placement={'topRight'}
            transformTip="translate(4%, 2%)"
            body={
              <Flex sx={styles.tipBody}>
                {t("ApeSwap's router that facilitates token swaps through external sources of liquidity.")}
              </Flex>
            }
            sx={{ width: ['220px', '220px', '350px'] }}
          >
            <Text sx={styles.tipTitle}>Smart,</Text>
          </TooltipBubble>{' '}
          <TooltipBubble
            placement={'topRight'}
            transformTip="translate(4%, 2%)"
            body={
              <Flex sx={styles.tipBody}>
                {t(
                  "ApeSwap's router that finds backrunning strategies and returns a Swap Bonus when arbitrage is identified.",
                )}
              </Flex>
            }
            sx={{ width: ['260px', '260px', '350px'] }}
          >
            <Text sx={styles.tipTitle}>Bonus</Text>
          </TooltipBubble>
          <Text sx={styles.content}>{t(')')}</Text>
        </Text>
      </Flex>
    </Flex>,
    <Flex sx={styles.contentContainer} key={1}>
      <Text sx={styles.slideTitle}>{t('Confirm The Swap!')}</Text>
      <Flex sx={{ flexWrap: 'wrap', mt: 2, ...styles.content }}>
        <Text>
          {t(
            'Select SWAP and click CONFIRM SWAP. Approve the transaction in your wallet. In a few seconds, the trade will go through and you will receive your output tokens.',
          )}
        </Text>
      </Flex>
    </Flex>,
  ]
}

export const FarmSlides = () => {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  return [
    <Flex sx={styles.contentContainer} key={0}>
      <Text sx={styles.slideTitle}>{t('Add Liquidity')}</Text>
      <Flex sx={{ flexWrap: 'wrap', mt: 2, ...styles.content }}>
        <Text>
          {t('Select the desired farm and click GET LP. This will allow you to easily')}{' '}
          <TooltipBubble
            placement={'topRight'}
            transformTip="translate(0%, 2%)"
            body={
              <Flex sx={styles.tipBody}>
                {t('Contribute equal amounts of two tokens to the DEX to facilitate swaps between them.')}
              </Flex>
            }
            sx={{ width: ['250px', '250px', '350px'] }}
          >
            <Text sx={styles.tipTitle}>{t('add liquidity')}</Text>
          </TooltipBubble>{' '}
          {t('and obtain liquidity provider (LP) tokens in exchange.')}
        </Text>
        <Text sx={{ fontStyle: 'italic' }}>
          {t('⚡NEW: You can also')}{' '}
          <TooltipBubble
            placement={'topRight'}
            transformTip={`translate(${isMobile ? '10%' : '6%'}, 2%)`}
            body={
              <Flex sx={styles.tipBody}>
                {t('Convert one token directly into an LP token or other product in a single transaction.')}
              </Flex>
            }
            sx={{ width: ['210px', '210px', '350px'] }}
          >
            <Text sx={styles.tipTitle}>ZAP</Text>
          </TooltipBubble>{' '}
          {t('to add liquidity with single tokens!')}
        </Text>
      </Flex>
    </Flex>,
    <Flex sx={styles.contentContainer} key={1}>
      <Text sx={styles.slideTitle}>{t('Stake')}</Text>
      <Flex sx={{ flexWrap: 'wrap', mt: 2, ...styles.content }}>
        <Text>
          {t(
            `Once you have the LP tokens, ENABLE your desired Farm and then click DEPOSIT to stake and start earning.`,
          )}
        </Text>
      </Flex>
    </Flex>,
    <Flex sx={styles.contentContainer} key={2}>
      <Text sx={styles.slideTitle}>{t('Collect!')}</Text>
      <Flex sx={{ flexWrap: 'wrap', mt: 2, ...styles.content }}>
        <Text>
          {t("Don't forget to HARVEST your earnings periodically. You can reinvest them or cash out at any time!")}
        </Text>
      </Flex>
    </Flex>,
  ]
}

export const PoolSlides = () => {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  return [
    <Flex sx={styles.contentContainer} key={0}>
      <Text sx={styles.slideTitle}>{t('Get Tokens!!')}</Text>
      <Flex sx={{ flexWrap: 'wrap', mt: 2, ...styles.content }}>
        <Text>{t('Select GET BANANA or GET GNANA to acquire tokens to stake.')}</Text>
        <Text>
          {t('If you want to stake')}{' '}
          <TooltipBubble
            placement={'topRight'}
            transformTip={`translate(3%, 2%)`}
            body={
              <Flex sx={styles.tipBody}>
                {t("ApeSwap's governance token that also enables access to exclusive pools and IAO allocations")}
              </Flex>
            }
            sx={{ width: ['210px', '210px', '350px'] }}
          >
            <Text sx={styles.tipTitle}>GNANA,</Text>
          </TooltipBubble>{' '}
          {t("you'll need to get BANANA First!")}
        </Text>
      </Flex>
    </Flex>,
    <Flex sx={styles.contentContainer} key={1}>
      <Text sx={styles.slideTitle}>{t('Stake')}</Text>
      <Flex sx={{ flexWrap: 'wrap', mt: 2, ...styles.content }}>
        <Text>
          {t(`Once you have the tokens, ENABLE your desired Pool and then click DEPOSIT to stake and start earning.`)}
        </Text>
      </Flex>
    </Flex>,
    <Flex sx={styles.contentContainer} key={2}>
      <Text sx={styles.slideTitle}>{t('Collect!')}</Text>
      <Flex sx={{ flexWrap: 'wrap', mt: 2, ...styles.content }}>
        <Text>
          {t("Don't forget to HARVEST your earnings periodically. You can reinvest them or cash out at any time!")}
        </Text>
      </Flex>
    </Flex>,
  ]
}
