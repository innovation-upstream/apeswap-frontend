/** @jsxImportSource theme-ui */
import React, { useEffect, useState } from 'react'
import { JSBI, Pair, Percent } from '@ape.swap/sdk'
import { Text, Flex, CardProps, Button, Svg } from '@ape.swap/uikit'
import { Divider } from 'theme-ui'
import { AnimatePresence, motion } from 'framer-motion'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getTokenUsdPrice } from 'utils/getTokenUsdPrice'
import { useTranslation } from 'contexts/Localization'
import useTotalSupply from '../../../../../hooks/useTotalSupply'

import { useTokenBalance } from '../../../../../state/wallet/hooks'
import { unwrappedToken } from '../../../../../utils/wrappedCurrency'

import CurrencyLogo from 'components/Logo/CurrencyLogo'
import { DoubleCurrencyLogo } from 'components/Logo'
import Dots from 'components/Loader/Dots'
import { styles } from './styles'
import { Link } from 'react-router-dom'
import { currencyId } from 'utils/currencyId'
import { useZapMigratorActionHandlers } from 'state/zapMigrator/hooks'

interface PositionCardProps extends CardProps {
  pair: Pair
  showUnwrapped?: boolean
}

export default function FullPositionCard({ pair }: PositionCardProps) {
  const { account, chainId } = useActiveWeb3React()

  const [currencyPrice, setCurrencyPrice] = useState<number>(null)

  const { onUserSetMigrator } = useZapMigratorActionHandlers()

  const currency0 = unwrappedToken(pair.token0)
  const currency1 = unwrappedToken(pair.token1)
  const liquidityToken = pair?.liquidityToken
  const smartRouter = pair?.router

  const [showMore, setShowMore] = useState(false)
  const { t } = useTranslation()

  const userPoolBalance = useTokenBalance(account ?? undefined, pair.liquidityToken)
  const totalPoolTokens = useTotalSupply(pair.liquidityToken)

  useEffect(() => {
    const fetchCurrencyTokenPrice = async () => {
      const tokenPriceReturned = await getTokenUsdPrice(chainId, pair?.liquidityToken?.address, 18, true, false)
      setCurrencyPrice(tokenPriceReturned)
    }
    fetchCurrencyTokenPrice()
  }, [pair, chainId])

  const poolTokenPercentage =
    !!userPoolBalance && !!totalPoolTokens && JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? new Percent(userPoolBalance.raw, totalPoolTokens.raw)
      : undefined

  const [token0Deposited, token1Deposited] =
    !!pair &&
    !!totalPoolTokens &&
    !!userPoolBalance &&
    // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
    JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? [
          pair.getLiquidityValue(pair.token0, totalPoolTokens, userPoolBalance, false),
          pair.getLiquidityValue(pair.token1, totalPoolTokens, userPoolBalance, false),
        ]
      : [undefined, undefined]

  return (
    <Flex sx={{ ...styles.poolContainer }} onClick={() => setShowMore((prev) => !prev)}>
      <Flex sx={{ ...styles.innerContainer }}>
        <Flex sx={{ ...styles.titleContainer }}>
          <Flex sx={{ alignItems: 'center' }}>
            <Flex sx={{ mr: '7.5px' }}>
              <DoubleCurrencyLogo currency0={currency0} currency1={currency1} size={20} />
            </Flex>
            <Flex sx={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
              <Text size="10px" weight={400} sx={{ lineHeight: '5px' }}>
                {liquidityToken?.symbol}
              </Text>
              <Text size="12px" weight={700}>
                {!currency0 || !currency1 ? (
                  <Dots>Loading</Dots>
                ) : (
                  `${currency0.getSymbol(chainId)} - ${currency1.getSymbol(chainId)}`
                )}
              </Text>
              <Text size="10px" weight={400} sx={{ lineHeight: '5px' }}>
                {currencyPrice ? `$${(currencyPrice * parseFloat(userPoolBalance?.toSignificant(4))).toFixed(2)}` : '-'}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex sx={{ alignItems: 'center' }}>
          <Button
            as={Link}
            onClick={() => onUserSetMigrator(pair.liquidityToken.address, smartRouter)}
            to={`migrate/${smartRouter.toLowerCase()}/${currencyId(currency0)}/${currencyId(currency1)}`}
            sx={{ height: '40px', mr: '10px' }}
          >
            <Svg icon="trade" width="15px" />
            <Text size="10px" weight={700} ml="5px">
              {t('Migrate Liquidity')}
            </Text>
          </Button>
          <Svg icon="caret" width="8px" direction={showMore ? 'up' : 'down'} />
        </Flex>
      </Flex>
      <AnimatePresence>
        {showMore && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'fit-content' }}
            transition={{ opacity: { duration: 0.2 } }}
            exit={{ opacity: 0, height: 0 }}
            sx={{ overflow: 'hidden', position: 'relative', width: '100%' }}
          >
            <Divider />
            <Flex sx={{ width: '100%', flexDirection: 'column', mb: '10px' }}>
              <Flex sx={{ justifyContent: 'space-between', margin: '2.5px 0px' }}>
                <Text size="14px" weight={500}>
                  {t('Total pooled tokens')}
                </Text>
                {userPoolBalance ? (
                  <Text size="14px" weight={700}>
                    {userPoolBalance?.toSignificant(4)}
                  </Text>
                ) : (
                  '-'
                )}
              </Flex>
              <Flex sx={{ justifyContent: 'space-between', margin: '2.5px 0px' }}>
                <Text size="14px" weight={500}>
                  {t('Pooled')} {currency0.getSymbol(chainId)}
                </Text>
                {token0Deposited ? (
                  <Flex sx={{ alignItems: 'center' }}>
                    <Text size="14px" weight={700} mr="8px">
                      {token0Deposited?.toSignificant(6)}
                    </Text>
                    <CurrencyLogo size="20px" currency={currency0} />
                  </Flex>
                ) : (
                  '-'
                )}
              </Flex>
              <Flex sx={{ justifyContent: 'space-between', margin: '2.5px 0px' }}>
                <Text size="14px" weight={500}>
                  {t('Pooled')} {currency1.getSymbol(chainId)}
                </Text>
                {token1Deposited ? (
                  <Flex sx={{ alignItems: 'center' }}>
                    <Text size="14px" weight={700} mr="8px">
                      {token1Deposited?.toSignificant(6)}
                    </Text>
                    <CurrencyLogo size="20px" currency={currency1} />
                  </Flex>
                ) : (
                  '-'
                )}
              </Flex>
              <Flex sx={{ justifyContent: 'space-between', margin: '2.5px 0px' }}>
                <Text size="14px" weight={500}>
                  {t('Share of pool')}
                </Text>
                <Text size="14px" weight={700}>
                  {poolTokenPercentage
                    ? `${poolTokenPercentage.toFixed(2) === '0.00' ? '<0.01' : poolTokenPercentage.toFixed(2)}%`
                    : '-'}
                </Text>
              </Flex>
            </Flex>
          </motion.div>
        )}
      </AnimatePresence>
    </Flex>
  )
}
