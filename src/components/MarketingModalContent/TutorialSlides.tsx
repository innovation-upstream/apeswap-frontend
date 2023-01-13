/** @jsxImportSource theme-ui */
import React from 'react'
import { Flex, Text, TooltipBubble, useWalletModal } from '@ape.swap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { CHAIN_PARAMS, NETWORK_LABEL } from 'config/constants/chains'
import { useTranslation } from 'contexts/Localization'
import { styles } from './styles'
import useIsMobile from '../../hooks/useIsMobile'
import { METAMASK_LINKS } from '../../config/constants'
import useAuth from '../../hooks/useAuth'

export const SwapSlides = () => {
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()
  const isMobile = useIsMobile()
  return [
    <Flex sx={styles.contentContainer} key={1}>
      <Text sx={styles.stepNo}>{t(`Step 1`)}</Text>
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
      <Text sx={styles.stepNo}>{t(`Step 2`)}</Text>
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
      <Text sx={styles.stepNo}>{t(`Step 3`)}</Text>
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
    <Flex sx={styles.contentContainer} key={1}>
      <Text sx={styles.stepNo}>{t(`Step 1`)}</Text>
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
        <Text sx={{ fontStyle: 'italic', fontWeight: 300 }}>
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
    <Flex sx={styles.contentContainer} key={2}>
      <Text sx={styles.stepNo}>{t(`Step 2`)}</Text>
      <Text sx={styles.slideTitle}>{t('Stake')}</Text>
      <Flex sx={{ flexWrap: 'wrap', mt: 2, ...styles.content }}>
        <Text>
          {t(
            `Once you have the LP tokens, ENABLE your desired Farm and then click DEPOSIT to stake and start earning.`,
          )}
        </Text>
      </Flex>
    </Flex>,
    <Flex sx={styles.contentContainer} key={3}>
      <Text sx={styles.stepNo}>{t(`Step 3`)}</Text>
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
  return [
    <Flex sx={styles.contentContainer} key={1}>
      <Text sx={styles.stepNo}>{t(`Step 1`)}</Text>
      <Text sx={styles.slideTitle}>{t('Get Tokens!')}</Text>
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
    <Flex sx={styles.contentContainer} key={2}>
      <Text sx={styles.stepNo}>{t(`Step 2`)}</Text>
      <Text sx={styles.slideTitle}>{t('Stake')}</Text>
      <Flex sx={{ flexWrap: 'wrap', mt: 2, ...styles.content }}>
        <Text>
          {t(`Once you have the tokens, ENABLE your desired Pool and then click DEPOSIT to stake and start earning.`)}
        </Text>
      </Flex>
    </Flex>,
    <Flex sx={styles.contentContainer} key={3}>
      <Text sx={styles.stepNo}>{t(`Step 3`)}</Text>
      <Text sx={styles.slideTitle}>{t('Collect!')}</Text>
      <Flex sx={{ flexWrap: 'wrap', mt: 2, ...styles.content }}>
        <Text>
          {t("Don't forget to HARVEST your earnings periodically. You can reinvest them or cash out at any time!")}
        </Text>
      </Flex>
    </Flex>,
  ]
}

export const MaximizerSlides = () => {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  return [
    <Flex sx={styles.contentContainer} key={1}>
      <Text sx={styles.stepNo}>{t(`Step 1`)}</Text>
      <Text sx={styles.slideTitle}>{t('Get Tokens!')}</Text>
      <Flex sx={{ flexWrap: 'wrap', mt: 2, ...styles.content }}>
        <Text>
          {t(
            'Open the desired Maximizer and click GET LP or GET BANANA. This will allow you to easily obtain tokens to stake.',
          )}
        </Text>
        <Text sx={{ fontStyle: 'italic', fontWeight: 300 }}>
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
          {t('to')}{' '}
          <TooltipBubble
            placement={'topLeft'}
            transformTip={`translate(${isMobile ? '10%' : '0'}, 2%)`}
            body={
              <Flex sx={styles.tipBody}>
                {t('Contribute equal amounts of two tokens to the DEX to facilitate swaps between them.')}
              </Flex>
            }
            sx={{ width: ['240px', '240px', '300px'] }}
          >
            <Text sx={{ ...styles.content, ...styles.tipTitle }}>add liquidity</Text>
          </TooltipBubble>{' '}
          {t('with single tokens!')}
        </Text>
      </Flex>
    </Flex>,
    <Flex sx={styles.contentContainer} key={2}>
      <Text sx={styles.stepNo}>{t(`Step 2`)}</Text>
      <Text sx={styles.slideTitle}>{t('Stake')}</Text>
      <Flex sx={{ flexWrap: 'wrap', mt: 2, ...styles.content }}>
        <Text>
          {t(
            `Once you have the LP tokens or BANANA, ENABLE your desired Maximizer and then click DEPOSIT to stake and start earning.`,
          )}
        </Text>
      </Flex>
    </Flex>,
    <Flex sx={styles.contentContainer} key={3}>
      <Text sx={styles.stepNo}>{t(`Step 3`)}</Text>
      <Text sx={styles.slideTitle}>{t('Enjoy!')}</Text>
      <Flex sx={{ flexWrap: 'wrap', mt: 2, ...styles.content }}>
        <Text>
          {t("You'll see your BANANA rewards balance grow over time. Both the 'AUTO' and 'MAX' Vaults will")}{' '}
          <TooltipBubble
            placement={'topRight'}
            transformTip={`translate(${isMobile ? '10%' : '0'}, 2%)`}
            body={
              <Flex sx={styles.tipBody}>
                {t('Maximizer Vaults will automatically re-stake your earnings periodically.')}
              </Flex>
            }
            sx={{ width: ['240px', '240px', '350px'] }}
          >
            <Text sx={styles.tipTitle}>{t('auto-compound')}</Text>
          </TooltipBubble>{' '}
          {t('your earnings! You can HARVEST them or UNSTAKE to cash out at any time.')}
        </Text>
      </Flex>
    </Flex>,
  ]
}

export const GnanaSlides = () => {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  return [
    <Flex sx={styles.contentContainer} key={1}>
      <Text sx={styles.stepNo}>{t(`Step 1`)}</Text>
      <Text sx={styles.slideTitle}>{t('Get BANANA')}</Text>
      <Flex sx={{ flexWrap: 'wrap', mt: 2, ...styles.content }}>
        <Text>
          {t('In order to convert into GNANA, you must first hold BANANA.')}{' '}
          <Text sx={styles.yellow}>
            <a href="https://apeswap.finance/swap" target="_blank" rel="noreferrer noopener">
              {t('Click here')}
            </a>
          </Text>{' '}
          {t('to trade any of your tokens for BANANA!')}
        </Text>
      </Flex>
    </Flex>,
    <Flex sx={styles.contentContainer} key={2}>
      <Text sx={styles.stepNo}>{t(`Step 2`)}</Text>
      <Text sx={styles.slideTitle}>{t('Convert')}</Text>
      <Flex sx={{ flexWrap: 'wrap', mt: 2, ...styles.content }}>
        <Text>
          {t(
            'Input the desired amount of BANANA you would like to convert, and select CONVERT. Then, confirm the transaction in your wallet.',
          )}
        </Text>
      </Flex>
    </Flex>,
    <Flex sx={styles.contentContainer} key={3}>
      <Text sx={styles.stepNo}>{t(`HEADS UP, APES!`)}</Text>
      <Text sx={styles.slideTitle}>{t('Conversion Fee!')}</Text>
      <Flex sx={{ flexWrap: 'wrap', mt: 2, ...styles.content }}>
        <Text>
          {t('Converting from BANANA to GNANA involves paying a 28% burn fee and a 2%')}{' '}
          <TooltipBubble
            placement={'topLeft'}
            transformTip={`translate(${isMobile ? '10%' : '0'}, 2%)`}
            body={
              <Flex sx={styles.tipBody}>
                {t(
                  'A fee charged when transferring a reflect token, that is then redistributed among the token holders.',
                )}
              </Flex>
            }
            sx={{ width: ['220px', '220px', '350px'] }}
          >
            <Text sx={styles.tipTitle}>{t('reflect fee')}</Text>
          </TooltipBubble>{' '}
          {t('for a total cost of 30%')}
        </Text>
        <Text sx={{ fontStyle: 'italic' }}>
          <Text sx={styles.content}>{t('(For every 1 BANANA you convert, you will receive 0.7 GNANA)')}</Text>
        </Text>
      </Flex>
    </Flex>,
    <Flex sx={styles.contentContainer} key={4}>
      <Text sx={styles.stepNo}>{t(`Step 3`)}</Text>
      <Text sx={styles.slideTitle}>{t(`You're Golden!`)}</Text>
      <Flex sx={{ flexWrap: 'wrap', mt: 2, ...styles.content }}>
        <Text>
          {t('Enjoy your new, shiny GNANA! You can now access exclusive pools, hold them to earn')}{' '}
          <TooltipBubble
            placement={'topLeft'}
            transformTip={`translate(${isMobile ? '10%' : '0'}, 2%)`}
            body={
              <Flex sx={styles.tipBody}>
                {t(
                  'A fee charged when transferring a reflect token, that is then redistributed among the token holders.',
                )}
              </Flex>
            }
            sx={{ width: ['200px', '200px', '320px'] }}
          >
            <Text sx={styles.tipTitle}>{t('reflect fees,')}</Text>
          </TooltipBubble>{' '}
          {t('or participate in GNANA IAOs.')}
        </Text>
        <Text sx={{ fontStyle: 'italic' }}>
          {t('Additionally, you can now vote in the')}{' '}
          <TooltipBubble
            placement={isMobile ? 'topLeft' : 'topRight'}
            transformTip={`translate(${isMobile ? '-3%' : '3%'}, 2%)`}
            body={
              <Flex sx={styles.tipBody}>
                {t(
                  'A decentralized autonomous organization, or DAO, is a community-led entity with no central authority that is governed by computer code.',
                )}
              </Flex>
            }
            sx={{ width: ['275px', '275px', '350px'] }}
          >
            <Text sx={styles.tipTitle}>DAO&apos;s</Text>
          </TooltipBubble>{' '}
          <Text sx={styles.yellow}>
            <a
              href="https://discuss.apeswap.finance/?_ga=2.192308074.1948993264.1666625902-2101162031.1664826138"
              target="_blank"
              rel="noreferrer noopener"
            >
              {t('Governance!')}
            </a>
          </Text>
        </Text>
      </Flex>
    </Flex>,
  ]
}

export const BillsSlides = () => {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  return [
    <Flex sx={styles.contentContainer} key={1}>
      <Text sx={styles.stepNo}>{t(`Step 1`)}</Text>
      <Text sx={styles.slideTitle}>{t('Select & Enable')}</Text>
      <Flex sx={{ flexWrap: 'wrap', mt: 2, ...styles.content }}>
        <Text>
          {t('Click or tap BUY on the desired Bill and ENABLE it. Then, approve the transaction in your wallet.')}
        </Text>
        <Text sx={{ fontStyle: 'italic' }}>{t("You'll see the tokens' discount compared to market price.")}</Text>
      </Flex>
    </Flex>,
    <Flex sx={styles.contentContainer} key={2}>
      <Text sx={styles.stepNo}>{t(`Step 2`)}</Text>
      <Text sx={styles.slideTitle}>{t('Add Liquidity')}</Text>
      <Flex sx={{ flexWrap: 'wrap', mt: 2, ...styles.content }}>
        <Text>
          {t('Select GET LP - This will allow you to easily')}{' '}
          <TooltipBubble
            placement={isMobile ? 'topLeft' : 'topRight'}
            transformTip="translate(0%, 2%)"
            body={
              <Flex sx={styles.tipBody}>
                {t('Contribute equal amounts of two tokens to the DEX to facilitate swaps between them.')}
              </Flex>
            }
            sx={{ width: ['230px', '230px', '350px'] }}
          >
            <Text sx={styles.tipTitle}>{t('add liquidity')}</Text>{' '}
          </TooltipBubble>{' '}
          {t('and obtain liquidity provider (LP) tokens in exchange.')}
        </Text>
        <Text sx={{ fontStyle: 'italic', fontWeight: 300 }}>
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
    <Flex sx={styles.contentContainer} key={3}>
      <Text sx={styles.stepNo}>{t(`Step 3`)}</Text>
      <Text sx={styles.slideTitle}>{t('Buy')}</Text>
      <Flex sx={{ flexWrap: 'wrap', mt: 2, ...styles.content }}>
        <Text>
          {t(
            'Input the desired amount of LPs to deposit and select BUY. Then, confirm the transaction in your wallet.',
          )}
        </Text>
        <Text sx={{ fontStyle: 'italic', fontWeight: 300 }}>
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
          {t('to buy bills with single tokens!')}
        </Text>
      </Flex>
    </Flex>,
    <Flex sx={styles.contentContainer} key={4}>
      <Text sx={styles.stepNo}>{t(`Step 4`)}</Text>
      <Text sx={styles.slideTitle}>{t(`Claim!`)}</Text>
      <Flex sx={{ flexWrap: 'wrap', mt: 2, ...styles.content }}>
        <Text>
          {t(
            'The tokens will vest linearly until the end of the vesting period. You can CLAIM as you earn, or all at once after fully vested.',
          )}{' '}
          {t('You can also')}{' '}
          <TooltipBubble
            placement={'topLeft'}
            transformTip={`translate(${isMobile ? '10%' : '0'}, 2%)`}
            body={
              <Flex sx={styles.tipBody}>
                {t('Transferring a Treasury Bill NFT will also transfer any unclaimed tokens to the new holder.')}
              </Flex>
            }
            sx={{ width: ['200px', '200px', '350px'] }}
          >
            <Text sx={styles.tipTitle}>{t('TRANSFER')}</Text>
          </TooltipBubble>{' '}
          {t('your Bill NFTs to other wallets!')}
        </Text>
      </Flex>
    </Flex>,
  ]
}

export const IAOSlides = () => {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  return [
    <Flex sx={styles.contentContainer} key={1}>
      <Text sx={styles.stepNo}>{t(`Step 1`)}</Text>
      <Text sx={styles.slideTitle}>{t('Prepare For Takeoff')}</Text>
      <Flex sx={{ flexWrap: 'wrap', mt: 2, ...styles.content }}>
        <Text>
          {t('You can commit with either BNB or')}{' '}
          <TooltipBubble
            placement={isMobile ? 'topLeft' : 'topRight'}
            transformTip={`translate(${isMobile ? '0' : '3%'}, 2%)`}
            body={
              <Flex sx={styles.tipBody}>
                {t("ApeSwap's governance token that also enables access to exclusive pools and IAO allocations")}
              </Flex>
            }
            sx={{ width: ['270px', '270px', '350px'] }}
          >
            <Text sx={styles.tipTitle}>GNANA</Text>
          </TooltipBubble>{' '}
          {t('(or both!). Select GET BNB or GET GNANA to acquire the tokens you need.')}
        </Text>
        <Text sx={{ fontStyle: 'italic' }}>
          {t('Make sure you have the tokens ready for when the sale goes live!')}
        </Text>
      </Flex>
    </Flex>,
    <Flex sx={styles.contentContainer} key={2}>
      <Text sx={styles.stepNo}>{t(`Step 2`)}</Text>
      <Text sx={styles.slideTitle}>{t('3, 2, 1... Commit!')}</Text>
      <Flex sx={{ flexWrap: 'wrap', mt: 2, ...styles.content }}>
        <Text>{t('Once the IAO goes live, input the desired amount of tokens to commit and select CONTRIBUTE.')}</Text>
      </Flex>
    </Flex>,
    <Flex sx={styles.contentContainer} key={3}>
      <Text sx={styles.stepNo}>{t(`Keep in mind`)}</Text>
      <Text sx={styles.slideTitle}>{t('Overflow')}</Text>
      <Flex sx={{ flexWrap: 'wrap', mt: 2, ...styles.content }}>
        <Text>
          {t('After the sale ends, if the IAO is')}{' '}
          <TooltipBubble
            placement={isMobile ? 'topLeft' : 'topRight'}
            transformTip={`translate(${isMobile ? '0' : '-6%'}, 2%)`}
            body={
              <Flex sx={styles.tipBody}>
                {t(
                  'When more than the target amount of funds are raised, all extra funds will be proportionally distributed to their owners.',
                )}
              </Flex>
            }
            sx={{ width: ['270px', '270px', '400px'] }}
          >
            <Text sx={styles.tipTitle}>{t('oversubscribed')},</Text>
          </TooltipBubble>{' '}
          {t("you'll automatically receive any excess overflow tokens.")}
        </Text>
      </Flex>
    </Flex>,
    <Flex sx={styles.contentContainer} key={4}>
      <Text sx={styles.stepNo}>{t(`Step 4`)}</Text>
      <Text sx={styles.slideTitle}>{t(`Claim`)}</Text>
      <Flex sx={{ flexWrap: 'wrap', mt: 2, ...styles.content }}>
        <Text>
          {t('The tokens will')}{' '}
          <TooltipBubble
            placement={'topRight'}
            transformTip={`translate(${isMobile ? '2%' : '-3%'}, 2%)`}
            body={
              <Flex sx={styles.tipBody}>
                {t(
                  'Tokens become available incrementally over time, starting immediately after the sale, and ending when the vesting period is completed.',
                )}
              </Flex>
            }
            sx={{ width: ['210px', '210px', '350px'] }}
          >
            <Text sx={styles.tipTitle}>{t('vest linearly')}</Text>
          </TooltipBubble>{' '}
          {t('until the end of the vesting period. You can CLAIM as you earn, or all at once after fully vested.')}
        </Text>
      </Flex>
    </Flex>,
  ]
}

export const OrdersSlides = () => {
  const { t } = useTranslation()
  return [
    <Flex sx={styles.contentContainer} key={1}>
      <Text sx={styles.stepNo}>{t(`Step 1`)}</Text>
      <Text sx={styles.slideTitle}>{t('Set Conditions')}</Text>
      <Flex sx={{ flexWrap: 'wrap', mt: 2, ...styles.content }}>
        <Text>
          {t(
            'Select the tokens you want to trade and enter your preferred amount. Then, enter the price at which you want to trade',
          )}
        </Text>
      </Flex>
    </Flex>,
    <Flex sx={styles.contentContainer} key={2}>
      <Text sx={styles.stepNo}>{t(`Step 2`)}</Text>
      <Text sx={styles.slideTitle}>{t('Place Your Order')}</Text>
      <Flex sx={{ flexWrap: 'wrap', mt: 2, ...styles.content }}>
        <Text> {t('Select APPROVE and click PLACE ORDER, then confirm the transaction in your wallet.')}</Text>
        <Text sx={{ fontStyle: 'italic' }}>{t('You will see your open and past orders below!')}</Text>
      </Flex>
    </Flex>,
    <Flex sx={styles.contentContainer} key={3}>
      <Text sx={styles.stepNo}>{t(`Step 3`)}</Text>
      <Text sx={styles.slideTitle}>{t('Hold Tight!')}</Text>
      <Flex sx={{ flexWrap: 'wrap', mt: 2, ...styles.content }}>
        <Text>{t('Wait for your order to execute, or cancel it at any time.')}</Text>
        <Text sx={{ fontStyle: 'italic' }}>
          {t(
            "Remember: you'll need to be holding the funds for the trade to be successful once the market price reaches the price you set.",
          )}
        </Text>
      </Flex>
    </Flex>,
  ]
}

export const LiquiditySlides = () => {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  return [
    <Flex sx={styles.contentContainer} key={1}>
      <Text sx={styles.stepNo}>{t(`Step 1`)}</Text>
      <Text sx={styles.slideTitle}>{t('Select Tokens & Amount')}</Text>
      <Flex sx={{ flexWrap: 'wrap', mt: 2, ...styles.content }}>
        <Text>{t('Select the tokens you want to trade and enter your preferred amount.')}</Text>
        <Text sx={{ fontStyle: 'italic' }}>{t('Assets are always deposited in an equal 50/50 value split!')}</Text>
      </Flex>
    </Flex>,
    <Flex sx={styles.contentContainer} key={2}>
      <Text sx={styles.stepNo}>{t(`Step 2`)}</Text>
      <Text sx={styles.slideTitle}>{t('Confirm Add Liquidity')}</Text>
      <Flex sx={{ flexWrap: 'wrap', mt: 2, ...styles.content }}>
        <Text>
          {t(
            'Select ADD LIQUIDITY, click CONFIRM and approve the transaction in your wallet. You will receive your liquidity provider (LP) tokes shortly.',
          )}
        </Text>
        <Text sx={{ fontStyle: 'italic', fontWeight: 300 }}>
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
    <Flex sx={styles.contentContainer} key={3}>
      <Text sx={styles.stepNo}>{t(`Step 3`)}</Text>
      <Text sx={styles.slideTitle}>{t('Enjoy The Rewards!')}</Text>
      <Flex sx={{ flexWrap: 'wrap', mt: 2, ...styles.content }}>
        <Text>
          {t('You are now earning')}{' '}
          <TooltipBubble
            placement={'topRight'}
            transformTip={`translate(${isMobile ? '8%' : '5%'}, 2%)`}
            body={
              <Flex sx={styles.tipBody}>
                {t(
                  'LP token holders receive a portion of the fees charged when swaps occur between the tokens that comprise that LP.',
                )}
              </Flex>
            }
            sx={{ width: ['210px', '210px', '350px'] }}
          >
            <Text sx={styles.tipTitle}>{t('fees')}</Text>
          </TooltipBubble>{' '}
          {t('for each transaction that uses this pair of tokens on the network. Some LPs can also be staked on')}{' '}
          <Text sx={styles.yellow}>
            <a href="https://apeswap.finance/banana-farms" target="_blank" rel="noreferrer noopener">
              {t('Yield Farms')}
            </a>
          </Text>{' '}
          {t(' or ')}{' '}
          <Text sx={styles.yellow}>
            <a href="https://apeswap.finance/maximizers" target="_blank" rel="noreferrer noopener">
              {t('BANANA Maximizers')}
            </a>
          </Text>{' '}
          {t('for additional rewards!')}
        </Text>
      </Flex>
    </Flex>,
  ]
}

export const MigrateSlides = () => {
  const { t } = useTranslation()
  return [
    <Flex sx={styles.contentContainer} key={1}>
      <Text sx={styles.stepNo}>{t(`Step 1`)}</Text>
      <Text sx={styles.slideTitle}>{t('Begin Your Migration')}</Text>
      <Flex sx={{ flexWrap: 'wrap', mt: 2, ...styles.content }}>
        <Text>
          {t(
            'If you have LPs to migrate, select MIGRATE ALL to start migrating. Your custom migration experience will load automatically!',
          )}
        </Text>
        <Text sx={{ fontStyle: 'italic' }}>{t('You can also migrate LPs individually, if you prefer.')}</Text>
      </Flex>
    </Flex>,
    <Flex sx={styles.contentContainer} key={2}>
      <Text sx={styles.stepNo}>{t(`Step 2`)}</Text>
      <Text sx={styles.slideTitle}>{t('Unstake Your External LPs')}</Text>
      <Flex sx={{ flexWrap: 'wrap', mt: 2, ...styles.content }}>
        <Text>
          {t(
            'Select the UNSTAKE ALL button to unstake your positions from the other DEX. Confirm all the transactions in your wallet.',
          )}
        </Text>
        <Text sx={{ fontStyle: 'italic', fontWeight: 300 }}>
          {t(`You'll be able to see your overall migration progress!`)}
        </Text>
      </Flex>
    </Flex>,
    <Flex sx={styles.contentContainer} key={3}>
      <Text sx={styles.stepNo}>{t(`Step 3`)}</Text>
      <Text sx={styles.slideTitle}>{t('Migrate LPs To ApeSwap')}</Text>
      <Flex sx={{ flexWrap: 'wrap', mt: 2, ...styles.content }}>
        <Text>
          {t(
            'Select APPROVE ALL to approve the ApeSwap migration contracts. Then, select MIGRATE ALL to move your LPs over to ApeSwap. Confirm all the transactions in your wallet.',
          )}
        </Text>
        <Text sx={{ fontStyle: 'italic', fontWeight: 300 }}>{t(`Your LPs will now become APE-LPs!`)}</Text>
      </Flex>
    </Flex>,
    <Flex sx={styles.contentContainer} key={3}>
      <Text sx={styles.stepNo}>{t(`Step 4`)}</Text>
      <Text sx={styles.slideTitle}>{t('Stake In ApeSwap')}</Text>
      <Flex sx={{ flexWrap: 'wrap', mt: 2, ...styles.content }}>
        <Text>
          {t(
            'Select APPROVE ALL and then STAKE ALL to stake all your tokens in ApeSwap products. Confirm all the transactions in your wallet.',
          )}
        </Text>
        <Text sx={{ fontStyle: 'italic', fontWeight: 300 }}>
          {t('You can also stake in')}{' '}
          <TooltipBubble
            placement={'topRight'}
            transformTip={`translate(5%, 2%)`}
            body={
              <Flex sx={styles.tipBody}>
                {t(
                  'LP token holders receive a portion of the fees charged when swaps occur between the tokens that comprise that LP.',
                )}
              </Flex>
            }
            sx={{ width: ['210px', '210px', '350px'] }}
          >
            <Text sx={styles.tipTitle}>{t('Maximizer Vaults')}</Text>
          </TooltipBubble>{' '}
          {t(`by toggling “Migrate to Maximizers”.`)}
        </Text>
      </Flex>
    </Flex>,
    <Flex sx={styles.contentContainer} key={3}>
      <Text sx={styles.stepNo}>{t(`Congratulations`)}</Text>
      <Text sx={styles.slideTitle}>{t('Enjoy Your Rewards!')}</Text>
      <Flex sx={{ flexWrap: 'wrap', mt: 2, ...styles.content }}>
        <Text>
          {t(
            `You're now ready to migrate all your LPs from external DEXs into ApeSwap to earn new yields. What are you waiting for!?`,
          )}
        </Text>
        <Text sx={{ fontStyle: 'italic', fontWeight: 300 }}>
          {t(`You'll see a summary of your migrated assets after all steps are completed.`)}
        </Text>
      </Flex>
    </Flex>,
  ]
}

export const ConnectWalletSlide = () => {
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)
  return (
    <Flex sx={styles.contentContainer} key={0}>
      <Text sx={styles.stepNo}>{t(`Step 0`)}</Text>
      <Text sx={styles.slideTitle}>{t('Connect Your Wallet')}</Text>
      <Flex sx={{ flexWrap: 'wrap', mt: 2, ...styles.content }}>
        <Text sx={styles.yellow} onClick={onPresentConnectModal}>
          {t('Click here')}
        </Text>
        <Text sx={{ ml: '3px' }}>{t('to connect your wallet to ApeSwap.')}</Text>
        <Text sx={{ fontStyle: 'italic' }}>
          {t(`Don’t have a wallet? A full setup guide for MetaMask on ${NETWORK_LABEL[chainId]} can be found `)}
          <Text sx={styles.yellow}>
            <a href={METAMASK_LINKS[NETWORK_LABEL[chainId]]} target="_blank" rel="noreferrer noopener">
              {t('here')}
            </a>
          </Text>
        </Text>
      </Flex>
    </Flex>
  )
}
