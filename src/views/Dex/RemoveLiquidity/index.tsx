import React, { useCallback, useState } from 'react'
import { useCurrency } from 'hooks/Tokens'
import { ArrowDropLeftIcon, Flex, Text } from '@ape.swap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useTranslation } from 'contexts/Localization'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Currency, CurrencyAmount, JSBI, Percent, TokenAmount, Trade } from '@apeswapfinance/sdk'
import { useAppDispatch } from 'state'
import { useBurnActionHandlers, useBurnState, useDerivedBurnInfo } from 'state/burn/hooks'
import { useTokenBalance } from 'state/wallet/hooks'
import useTotalSupply from 'hooks/useTotalSupply'
import { Field } from 'state/burn/actions'
import { dexStyles } from '../styles'
import DexPanel from '../components/DexPanel'
import DexNav from '../components/DexNav'
import PoolInfo from './components/PoolInfo'
import RemoveLiquidityActions from './components/Actions'
import MyPositions from '../components/MyPositions'

function RemoveLiquidity({
  match: {
    params: { currencyIdA, currencyIdB },
  },
  history,
}: RouteComponentProps<{ currencyIdA: string; currencyIdB: string }>) {
  const { account, chainId, library } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  /**
   * TODO: Setup first liquidity add message
   *
   */

  // Set currencies
  const currencyA = useCurrency(currencyIdA)
  const currencyB = useCurrency(currencyIdB)

  // burn state
  const { independentField, typedValue } = useBurnState()
  const { pair, parsedAmounts, error } = useDerivedBurnInfo(currencyA ?? undefined, currencyB ?? undefined)
  const { onUserInput: _onUserInput } = useBurnActionHandlers()
  const userPoolBalance = useTokenBalance(account ?? undefined, pair?.liquidityToken)
  const totalPoolTokens = useTotalSupply(pair?.liquidityToken)

  // allowance handling
  const [, setSignatureData] = useState<{ v: number; r: string; s: string; deadline: number } | null>(null)

  // get formatted amounts
  const formattedAmounts = {
    [Field.LIQUIDITY_PERCENT]: parsedAmounts[Field.LIQUIDITY_PERCENT].equalTo('0')
      ? '0'
      : parsedAmounts[Field.LIQUIDITY_PERCENT].lessThan(new Percent('1', '100'))
      ? '<1'
      : parsedAmounts[Field.LIQUIDITY_PERCENT].toFixed(0),
    [Field.LIQUIDITY]:
      independentField === Field.LIQUIDITY ? typedValue : parsedAmounts[Field.LIQUIDITY]?.toSignificant(6) ?? '',
    [Field.CURRENCY_A]:
      independentField === Field.CURRENCY_A ? typedValue : parsedAmounts[Field.CURRENCY_A]?.toSignificant(6) ?? '',
    [Field.CURRENCY_B]:
      independentField === Field.CURRENCY_B ? typedValue : parsedAmounts[Field.CURRENCY_B]?.toSignificant(6) ?? '',
  }

  const dynamicUserPoolBalance = BigInt(
    (
      parseInt(userPoolBalance?.raw?.toString()) * (parseInt(formattedAmounts[Field.LIQUIDITY_PERCENT]) / 100) || 0
    ).toFixed(0),
  )

  const poolTokenPercentage =
    !!userPoolBalance && !!totalPoolTokens && JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? new Percent(dynamicUserPoolBalance, totalPoolTokens.raw)
      : undefined

  // wrapped onUserInput to clear signatures
  const onUserInput = useCallback(
    (field: Field, value: string) => {
      setSignatureData(null)
      return _onUserInput(field, value)
    },
    [_onUserInput],
  )

  const handleMaxInput = useCallback(
    (_: Field) => {
      onUserInput(Field.LIQUIDITY_PERCENT, '100')
    },
    [onUserInput],
  )

  return (
    <Flex sx={{ ...dexStyles.pageContainer }}>
      <Flex sx={{ ...dexStyles.dexContainer }}>
        <DexNav />
        <Flex sx={{ margin: '20px 0px 5px 0px', justifyContent: 'center', maxWidth: '100%', width: '420px' }}>
          <Text weight={700}>{t('REMOVE LIQUIDITY')}</Text>
        </Flex>
        <MyPositions />
        <DexPanel
          value={formattedAmounts[Field.LIQUIDITY_PERCENT]}
          panelText={t('Remove:')}
          currency={currencyA}
          otherCurrency={currencyB}
          fieldType={Field.LIQUIDITY_PERCENT}
          onCurrencySelect={null}
          onUserInput={(field, val) =>
            parseInt(val) > 100
              ? onUserInput(field, '100')
              : val.toString() === ''
              ? onUserInput(field, '0')
              : onUserInput(field, parseInt(val).toString())
          }
          handleMaxInput={handleMaxInput}
          showCommonBases
          lpPair={pair}
        />
        <PoolInfo
          pair={pair}
          parsedAmounts={parsedAmounts}
          poolTokenPercentage={poolTokenPercentage}
          chainId={chainId}
        />
        <RemoveLiquidityActions
          pair={pair}
          error={error}
          parsedAmounts={parsedAmounts}
          poolTokenPercentage={poolTokenPercentage}
        />
      </Flex>
    </Flex>
  )
}

export default React.memo(RemoveLiquidity)
