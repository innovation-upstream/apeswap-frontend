import React, { useCallback, useMemo, useState } from 'react'
import { Flex, Link, Text } from '@ape.swap/uikit'
import DexPanel from 'views/Dex/components/DexPanel'
import { Field } from 'state/mint/actions'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useAppDispatch } from 'state'
import { useCurrency } from 'hooks/Tokens'
import { useDerivedMintForZap, useMintActionHandlers, useMintState } from 'state/mint/hooks'
import { Currency, TokenAmount } from '@apeswapfinance/sdk'
import maxAmountSpend from 'utils/maxAmountSpend'
import ZapPanel from './components/ZapPanel'
import { selectLP, selectToken } from 'state/zap/actions'
import { useZapState } from 'state/zap/hooks'
import ZapArrow from './components/Svg/ZapArrow'
import { getCurrencyUsdPrice } from 'utils/getTokenUsdPrice'
import DistributionPanel from './components/DistributionPanel'
import ZapLiquidityActions from './components/ZapLiquidityActions'
import { ParsedFarm } from './types'
import { styles } from './styles'

const ZapLiquidity = () => {
  const { chainId } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const { zapInto } = useZapState()
  const [prices, setPrices] = useState({ [Field.CURRENCY_A]: 0, [Field.CURRENCY_B]: 0 })

  // Set initial currencies. See for a better way to set initial currency BUSD
  const [currencyA, setCurrencyA] = useState(useCurrency('0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56'))
  const [currencyB, setCurrencyB] = useState(zapInto)

  // Handle currency selection
  const handleCurrencyASelect = useCallback(
    (field: Field, currency: Currency) => {
      setCurrencyA(currency)
      dispatch(selectToken({ zapFrom: currency }))
    },
    [dispatch],
  )

  const handleCurrencyBSelect = useCallback(
    (farm: ParsedFarm) => {
      setCurrencyB(farm)
      dispatch(selectLP({ zapInto: farm }))
    },
    [dispatch],
  )

  // re evaluate tokens pricing after hooks and state are finilized
  useMemo(async () => {
    console.log('calculating prices')
    const priceA = await getCurrencyUsdPrice(chainId, currencyA)
    const priceB = currencyB.lpValueUsd
    setPrices({ [Field.CURRENCY_A]: priceA, [Field.CURRENCY_B]: parseFloat(priceB) })
  }, [chainId, currencyA, currencyB])

  // mint state
  const { typedValue } = useMintState()
  const { parsedAmounts, currencyBalances, zapInsight, error } = useDerivedMintForZap(currencyA, currencyB, prices)

  const { onUserInput } = useMintActionHandlers(false)

  // get formatted amounts
  const formattedAmounts = {
    [Field.CURRENCY_A]: typedValue,
    [Field.CURRENCY_B]: parsedAmounts[Field.CURRENCY_B],
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
  const currencies = {
    [Field.CURRENCY_A]: currencyA,
    [Field.CURRENCY_B]: currencyB,
  }

  return (
    <div>
      <Flex sx={styles.liquidityContainer}>
        <DexPanel
          value={formattedAmounts[Field.CURRENCY_A]}
          panelText="From:"
          currency={currencyA}
          otherCurrency={null}
          fieldType={Field.CURRENCY_A}
          onCurrencySelect={handleCurrencyASelect}
          onUserInput={onUserInput}
          handleMaxInput={handleMaxInput}
          useZapList
        />
        <Flex sx={{ margin: '10px', justifyContent: 'center' }}>
          {
            // replace this arrow
          }
          <ZapArrow />
        </Flex>
        <ZapPanel
          value={formattedAmounts[Field.CURRENCY_B]}
          panelText="To:"
          selectedFarm={currencyB}
          fieldType={Field.CURRENCY_B}
          onLpSelect={handleCurrencyBSelect}
          handleMaxInput={handleMaxInput}
        />
        {typedValue && (
          <Flex sx={{ marginTop: '40px' }}>
            <DistributionPanel zapInsight={zapInsight} />
          </Flex>
        )}
        <ZapLiquidityActions
          currencies={currencies}
          error={error}
          parsedAmounts={parsedAmounts}
          zapInsight={zapInsight}
        />
        <Flex sx={{ marginTop: '10px', justifyContent: 'center' }}>
          <Link
            href="https://apeswap.gitbook.io/apeswap-finance/product-and-features/exchange/liquidity"
            target="_blank"
            textAlign="center"
          >
            <Text size="12px" style={{ lineHeight: '18px', fontWeight: 400, textDecoration: 'underline' }}>
              Learn more{'>'}
            </Text>
          </Link>
        </Flex>
      </Flex>
    </div>
  )
}

export default React.memo(ZapLiquidity)
