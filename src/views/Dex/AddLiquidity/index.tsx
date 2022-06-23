/** @jsxImportSource theme-ui */
import React, { useCallback, useEffect, useState } from 'react'
import { useCurrency } from 'hooks/Tokens'
import { ArrowDropLeftIcon, Button, Flex, Text, useModal } from '@ape.swap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useTranslation } from 'contexts/Localization'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Currency, CurrencyAmount, JSBI, TokenAmount, Trade } from '@apeswapfinance/sdk'
import { useDefaultsFromURLSearch, useDerivedSwapInfo, useSwapActionHandlers, useSwapState } from 'state/swap/hooks'
import maxAmountSpend from 'utils/maxAmountSpend'
import { useAppDispatch } from 'state'
import { Field, resetMintState } from 'state/mint/actions'
import { currencyId } from 'utils/currencyId'
import { useDerivedMintInfo, useMintActionHandlers, useMintState } from 'state/mint/hooks'
import { dexStyles, textUnderlineHover } from '../styles'
import { styles } from './styles'
import DexPanel from '../components/DexPanel'
import DexNav from '../components/DexNav'
import AddLiquiditySign from './components/AddLiquiditySign'
import PoolInfo from './components/PoolInfo'
import AddLiquidityActions from './components/Actions'
import MyPositions from '../components/MyPositions'

function AddLiquidity({
  match: {
    params: { currencyIdA, currencyIdB },
  },
  history,
}: RouteComponentProps<{ currencyIdA?: string; currencyIdB?: string }>) {
  const { account, chainId, library } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const { INPUT, OUTPUT } = useSwapState()
  const { t } = useTranslation()

  /**
   *
   */

  // Set either param currency or swap currency
  currencyIdA = currencyIdA || INPUT.currencyId
  currencyIdB = currencyIdB || OUTPUT.currencyId

  // Set currencies
  const currencyA = useCurrency(currencyIdA)
  const currencyB = useCurrency(currencyIdB)

  // Check to reset mint state
  useEffect(() => {
    if (!currencyIdA && !currencyIdB) {
      dispatch(resetMintState())
    }
  }, [dispatch, currencyIdA, currencyIdB])

  // mint state
  const { independentField, typedValue, otherTypedValue } = useMintState()
  const {
    dependentField,
    currencies,
    pair,
    pairState,
    currencyBalances,
    parsedAmounts,
    price,
    noLiquidity,
    liquidityMinted,
    poolTokenPercentage,
    error,
  } = useDerivedMintInfo(currencyA ?? undefined, currencyB ?? undefined)

  const { onUserInput } = useMintActionHandlers(noLiquidity)

  // Handle currency selection
  const handleCurrencySelect = useCallback(
    (field: Field, currency: Currency) => {
      const newCurrencyId = currencyId(currency)
      if (field === Field.CURRENCY_A) {
        if (newCurrencyId === currencyIdB) {
          history.push(`/add/${currencyIdB}/${currencyIdA}`)
        } else if (currencyIdB) {
          history.push(`/add/${newCurrencyId}/${currencyIdB}`)
        } else {
          history.push(`/add/${newCurrencyId}`)
        }
      } else if (field === Field.CURRENCY_B) {
        if (newCurrencyId === currencyIdA) {
          if (currencyIdB) {
            history.push(`/add/${currencyIdB}/${newCurrencyId}`)
          } else {
            history.push(`/add/${newCurrencyId}`)
          }
        } else {
          history.push(`/add/${currencyIdA || 'ETH'}/${newCurrencyId}`)
        }
      }
    },
    [currencyIdA, history, currencyIdB],
  )

  // get formatted amounts
  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: noLiquidity ? otherTypedValue : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  }

  // get the max amounts user can add
  const maxAmounts: { [field in Field]?: TokenAmount } = [Field.CURRENCY_A, Field.CURRENCY_B].reduce(
    (accumulator, field) => {
      return {
        ...accumulator,
        [field]: maxAmountSpend(currencyBalances[field]),
      }
    },
    {},
  )

  const handleMaxInput = useCallback(
    (field: Field) => {
      if (maxAmounts) {
        onUserInput(field, maxAmounts[field]?.toExact() ?? '')
      }
    },
    [maxAmounts, onUserInput],
  )

  return (
    <Flex sx={{ ...dexStyles.pageContainer }}>
      <Flex sx={{ ...dexStyles.dexContainer }}>
        <DexNav />
        <Flex sx={{ margin: '20px 0px 5px 0px', justifyContent: 'center', maxWidth: '100%', width: '420px' }}>
          <Text weight={700}>ADD LIQUIDITY</Text>
        </Flex>
        <MyPositions />
        {noLiquidity && (
          <Flex sx={{ ...styles.warningMessageContainer }}>
            <Text size="14px" weight={700} mb="10px" color="primaryBright">
              {t('You are the first liquidity provider.')}
            </Text>
            <Text size="12px" weight={500} color="primaryBright" sx={{ textAlign: 'center' }}>
              {t(
                'The ratio of tokens you add will set the price of this pool. Once you are happy with the rate click supply to review.',
              )}
            </Text>
          </Flex>
        )}
        <DexPanel
          value={formattedAmounts[Field.CURRENCY_A]}
          panelText="Token 1"
          currency={currencyA}
          otherCurrency={currencyB}
          fieldType={Field.CURRENCY_A}
          onCurrencySelect={handleCurrencySelect}
          onUserInput={onUserInput}
          handleMaxInput={handleMaxInput}
          showCommonBases
        />
        <AddLiquiditySign />
        <DexPanel
          value={formattedAmounts[Field.CURRENCY_B]}
          panelText="Token 2"
          currency={currencyB}
          otherCurrency={currencyA}
          fieldType={Field.CURRENCY_B}
          onCurrencySelect={handleCurrencySelect}
          onUserInput={onUserInput}
          handleMaxInput={handleMaxInput}
          showCommonBases
        />
        <PoolInfo
          currencies={currencies}
          poolTokenPercentage={poolTokenPercentage}
          noLiquidity={noLiquidity}
          price={price}
          chainId={chainId}
          liquidityMinted={liquidityMinted}
        />
        <AddLiquidityActions
          currencies={currencies}
          error={error}
          parsedAmounts={parsedAmounts}
          noLiquidity={noLiquidity}
          liquidityMinted={liquidityMinted}
          poolTokenPercentage={poolTokenPercentage}
          price={price}
        />
      </Flex>
    </Flex>
  )
}

export default React.memo(AddLiquidity)
