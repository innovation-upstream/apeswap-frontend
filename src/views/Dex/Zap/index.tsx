/** @jsxImportSource theme-ui */
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Flex, Link, Svg, Text } from '@ape.swap/uikit'
import DexPanel from 'views/Dex/components/DexPanel'
import { useCurrency } from 'hooks/Tokens'
import { ChainId, Currency, CurrencyAmount } from '@ape.swap/sdk'
import maxAmountSpend from 'utils/maxAmountSpend'
import ZapPanel from './components/ZapPanel'
import { Field } from 'state/zap/actions'
import { useDerivedZapInfo, useSetZapOutputList, useZapActionHandlers, useZapState } from 'state/zap/hooks'
import ZapLiquidityActions from './components/ZapLiquidityActions'
import { styles } from './styles'
import { dexStyles } from '../styles'
import { useZapCallback } from 'hooks/useZapCallback'
import DistributionPanel from './components/DistributionPanel/DistributionPanel'
import { currencyId } from 'utils/currencyId'
import { RouteComponentProps } from 'react-router-dom'
import DexNav from '../components/DexNav'
import MyPositions from '../components/MyPositions'
import LiquiditySubNav from '../components/LiquiditySubNav'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useUserSlippageTolerance, useValidTrackedTokenPairs } from 'state/user/hooks'

function ZapLiquidity({
  match: {
    params: { currencyIdA, currencyIdB, currencyIdC },
  },
  history,
}: RouteComponentProps<{ currencyIdA?: string; currencyIdB?: string; currencyIdC: string }>) {
  const { chainId } = useActiveWeb3React()

  // This needs to be updated as addresses should not be hardcoded
  useEffect(() => {
    // set default values if there are no URL params
    if (!currencyIdA || !currencyIdB) {
      onOutputSelect(
        chainId === ChainId.BSC
          ? {
              currency1: '0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95',
              currency2: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
            }
          : {
              currency1: '0x5d47baba0d66083c52009271faf3f50dcc01023c',
              currency2: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
            },
      )
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [chainId])
  const [{ zapErrorMessage, txHash }, setZapState] = useState<{
    zapErrorMessage: string | undefined
    txHash: string | undefined
  }>({
    zapErrorMessage: undefined,
    txHash: undefined,
  })

  // Set the zap default list
  // Get default token list and pinned pair tokens and create valid pairs
  const trackedTokenPairs = useValidTrackedTokenPairs()
  useSetZapOutputList(
    useMemo(() => {
      return trackedTokenPairs?.map(([token1, token2]) => {
        return { currencyIdA: token1.address, currencyIdB: token2.address }
      })
    }, [trackedTokenPairs]),
  )

  const { INPUT, OUTPUT, typedValue, recipient, zapType } = useZapState()
  const [zapSlippage] = useUserSlippageTolerance(true)

  const currencyA = currencyIdA || INPUT.currencyId
  const currencyB = currencyIdB || OUTPUT.currency1
  const currencyC = currencyIdC || OUTPUT.currency2

  const inputCurrency = useCurrency(currencyA)
  const outputCurrency = { currency1: currencyB, currency2: currencyC } as { currency1: string; currency2: string }

  const {
    zap,
    inputError: zapInputError,
    currencyBalances,
  } = useDerivedZapInfo(typedValue, inputCurrency, outputCurrency, recipient)
  const { onUserInput, onInputSelect, onOutputSelect, onCurrencySelection } = useZapActionHandlers()

  // TODO: handle url params on selection
  // // Handle currency selection
  // const handleCurrencySelect = useCallback(
  //     (field: Field, currency: Currency) => {
  //       const newCurrencyId = currencyId(currency)
  //       if (field === Field.CURRENCY_A) {
  //         if (newCurrencyId === currencyIdB) {
  //           history.push(`/add-liquidity/${currencyIdB}/${currencyIdA}`)
  //         } else if (currencyIdB) {
  //           history.push(`/add-liquidity/${newCurrencyId}/${currencyIdB}`)
  //         } else {
  //           history.push(`/add-liquidity/${newCurrencyId}`)
  //         }
  //       } else if (field === Field.CURRENCY_B) {
  //         if (newCurrencyId === currencyIdA) {
  //           if (currencyIdB) {
  //             history.push(`/add-liquidity/${currencyIdB}/${newCurrencyId}`)
  //           } else {
  //             history.push(`/add-liquidity/${newCurrencyId}`)
  //           }
  //         } else {
  //           history.push(`/add-liquidity/${currencyIdA || 'ETH'}/${newCurrencyId}`)
  //         }
  //       }
  //     },
  //     [currencyIdA, history, currencyIdB],
  //   )

  const handleCurrenciesURL = useCallback(
    (field: Field, currency: string) => {
      const newCurrencyId = currency
      if (field === Field.INPUT) {
        if (newCurrencyId === currencyIdB) {
          history.push(`/zap/${currencyIdB}/${currencyIdA}/${currencyIdC}`)
        } else if (currencyIdB) {
          history.push(`/zap/${newCurrencyId}/${currencyIdB}/${currencyIdC}`)
        } else {
          history.push(`/zap/${newCurrencyId}`)
        }
      } else if (field === Field.OUTPUT) {
        if (newCurrencyId === currencyIdA) {
          if (currencyIdB) {
            history.push(`/zap/${currencyIdB}/${newCurrencyId}/${currencyIdC}}`)
          } else {
            history.push(`/zap/${newCurrencyId}`)
          }
        } else {
          history.push(`/zap/${currencyIdA || 'ETH'}/${newCurrencyId}/${currencyIdC}`)
        }
      }
    },
    [currencyIdA, history, currencyIdB],
  )
  const handleInputSelect = useCallback(
    (field: Field, currency: Currency) => {
      const currencyAddress = currencyId(currency)
      if (handleCurrenciesURL) handleCurrenciesURL(field, currencyAddress)
      onInputSelect(field, currency)
    },
    [handleCurrenciesURL, onInputSelect],
  )

  const handleOutputSelect = useCallback(
    (currencyA: Currency, currencyB: Currency) => {
      // if (handleCurrenciesURL) handleCurrenciesURL(Field.OUTPUT, farm.lpAddress)
      onCurrencySelection(Field.OUTPUT, [currencyA, currencyB])
    },
    [handleCurrenciesURL, onCurrencySelection],
  )

  const { callback: zapCallback, error: zapCallbackError } = useZapCallback(
    zap,
    zapType,
    zapSlippage,
    recipient,
    '',
    null,
  )

  const handleZap = useCallback(() => {
    setZapState({
      zapErrorMessage: undefined,
      txHash: undefined,
    })
    zapCallback()
      .then((hash) => {
        setZapState({
          zapErrorMessage: undefined,
          txHash: hash,
        })
      })
      .catch((error) => {
        setZapState({
          zapErrorMessage: error.message,
          txHash: undefined,
        })
      })
  }, [zapCallback])

  const handleDismissConfirmation = useCallback(() => {
    // clear zapState if user close the error modal
    setZapState({
      zapErrorMessage: undefined,
      txHash: undefined,
    })
  }, [setZapState])

  const handleMaxInput = useCallback(
    (field: Field) => {
      const maxAmounts: { [field in Field]?: CurrencyAmount } = {
        [Field.INPUT]: maxAmountSpend(currencyBalances[Field.INPUT]),
        [Field.OUTPUT]: maxAmountSpend(currencyBalances[Field.OUTPUT]),
      }
      if (maxAmounts) {
        onUserInput(field, maxAmounts[field]?.toExact() ?? '')
      }
    },
    [currencyBalances, onUserInput],
  )

  // reset input value to zero on first render
  useEffect(() => {
    onUserInput(Field.INPUT, '')
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [])

  return (
    <Flex sx={dexStyles.pageContainer}>
      <Flex sx={{ flexDirection: 'column' }}>
        <Flex sx={dexStyles.dexContainer}>
          <DexNav zapSettings />
          <MyPositions />
          <LiquiditySubNav />
          <Flex sx={styles.liquidityContainer}>
            <DexPanel
              value={typedValue}
              panelText="From"
              currency={inputCurrency}
              otherCurrency={null}
              fieldType={Field.INPUT}
              onCurrencySelect={handleInputSelect}
              onUserInput={onUserInput}
              handleMaxInput={handleMaxInput}
              isZapInput
            />
            <Flex sx={{ margin: '10px', justifyContent: 'center' }}>
              <Svg icon="ZapArrow" />
            </Flex>
            <ZapPanel
              value={zap?.pairOut?.liquidityMinted?.toSignificant(10) || '0.0'}
              onSelect={handleOutputSelect}
              lpPair={zap.pairOut.pair}
            />
            {typedValue && parseFloat(typedValue) > 0 && zap?.pairOut?.liquidityMinted && (
              <Flex sx={{ marginTop: '40px' }}>
                <DistributionPanel zap={zap} />
              </Flex>
            )}
            <ZapLiquidityActions
              zapInputError={zapInputError}
              zap={zap}
              handleZap={handleZap}
              zapErrorMessage={zapErrorMessage}
              txHash={txHash}
              handleDismissConfirmation={handleDismissConfirmation}
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
        </Flex>
      </Flex>
    </Flex>
  )
}

export default React.memo(ZapLiquidity)
