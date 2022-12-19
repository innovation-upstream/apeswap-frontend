/** @jsxImportSource theme-ui */
import React from 'react'
import { Flex, Text, TooltipBubble, TutorialModal, useWalletModal } from '@ape.swap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { CHAIN_PARAMS, NETWORK_LABEL } from 'config/constants/chains'
import { METAMASK_LINKS } from 'config/constants'
import { useTranslation } from 'contexts/Localization'
import { PoolSlides } from './Pool'
import { MaximizerSlides } from './Maximizers'
import { GnanaSlides } from './Gnana'
import { BillSlides } from './Bills'
import { IaoSlides } from './Iao'
import { OrderSlides } from './Orders'
import { LiquiditySlides } from './Liquidity'
import { styles } from './styles'
import useAuth from '../../hooks/useAuth'
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
            <Text sx={{ ...styles.content, ...styles.tipTitle }}>Ape,</Text>
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
            <Text sx={{ ...styles.content, ...styles.tipTitle }}>Smart,</Text>
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
            <Text sx={{ ...styles.content, ...styles.tipTitle }}>Bonus</Text>
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
  const { chainId } = useActiveWeb3React()
  const isMobile = useIsMobile()
  return [
    <Flex sx={styles.contentContainer} key={0}>
      <Text sx={styles.slideTitle}>{t('Add Liquidity')}</Text>
      <Flex sx={{ flexWrap: 'wrap', mt: 2, ...styles.content }}>
        <Text>
          {t('Select the desired farm and click GET LP. This will allow you to easily')}
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
            <Text sx={{ mx: '3px', ...styles.tipTitle }}>{t('add liquidity')}</Text>
          </TooltipBubble>
          {t('and obtain liquidity provider (LP) tokens in exchange.')}
        </Text>
      </Flex>
    </Flex>,
  ]
}
