import React, { useCallback, useEffect, useState } from 'react'
import { Flex } from '@ape.swap/uikit'
import DexPanel from 'views/Dex/components/DexPanel'
import { Field, resetMintState } from 'state/mint/actions'
import AddLiquiditySign from 'views/Dex/AddLiquidity/components/AddLiquiditySign'
import PoolInfo from 'views/Dex/AddLiquidity/components/PoolInfo'
import AddLiquidityActions from 'views/Dex/AddLiquidity/components/Actions'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { useAppDispatch } from '../../state'
import { useSwapState } from '../../state/swap/hooks'
import { useCurrency } from '../../hooks/Tokens'
import { useDerivedMintInfo, useMintActionHandlers, useMintState } from '../../state/mint/hooks'
import { Currency, TokenAmount } from '@apeswapfinance/sdk'
import maxAmountSpend from '../../utils/maxAmountSpend'
import { styles } from './styles'

const RegularLiquidity = () => {
  const { chainId } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const { INPUT, OUTPUT } = useSwapState()
  const [tradeValueUsd, setTradeValueUsd] = useState(0)

  // Set either param currency or swap currency
  const currencyIdA = INPUT.currencyId
  const currencyIdB = OUTPUT.currencyId

  // Set currencies
  const [currencyA, setCurrencyA] = useState(useCurrency(currencyIdA))
  const [currencyB, setCurrencyB] = useState(useCurrency(currencyIdB))

  // Handle currency selection
  const handleCurrencySelect = useCallback((field: Field, currency: Currency) => {
    const newCurrencyId = currency
    if (field === Field.CURRENCY_A) {
      setCurrencyA(newCurrencyId)
    }
    if (field === Field.CURRENCY_B) {
      setCurrencyB(newCurrencyId)
    }
  }, [])

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
    currencyBalances,
    parsedAmounts,
    price,
    noLiquidity,
    liquidityMinted,
    poolTokenPercentage,
    error,
  } = useDerivedMintInfo(currencyA ?? undefined, currencyB ?? undefined)

  const { onUserInput } = useMintActionHandlers(noLiquidity)

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
    <div>
      <Flex sx={styles.liquidityContainer}>
        <DexPanel
          value={formattedAmounts[Field.CURRENCY_A]}
          panelText="Token 1"
          currency={currencyA}
          otherCurrency={currencyB}
          setTradeValueUsd={setTradeValueUsd}
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
          tradeValueUsd={tradeValueUsd}
          error={error}
          parsedAmounts={parsedAmounts}
          noLiquidity={noLiquidity}
          liquidityMinted={liquidityMinted}
          poolTokenPercentage={poolTokenPercentage}
          price={price}
        />
      </Flex>
    </div>
  )
}

export default React.memo(RegularLiquidity)
