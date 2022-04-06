import React, { useCallback, useEffect, useState } from 'react'
import { Modal, AutoRenewIcon, Text, AddIcon, IconButton } from '@apeswapfinance/uikit'
import { Flex, Button } from 'theme-ui'
import { Currency, ETHER, TokenAmount, ROUTER_ADDRESS, Token } from '@apeswapfinance/sdk'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import UnderlinedButton from 'components/UnderlinedButton'
import { useSwapState } from 'state/swap/hooks'
import PoolPriceBar from 'views/AddLiquidity/PoolPriceBar'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useTheme from 'hooks/useTheme'
import { useDerivedMintInfo, useMintActionHandlers, useMintState } from '../../state/mint/hooks'
import { useCurrency } from '../../hooks/Tokens'
import { Field, resetMintState } from '../../state/mint/actions'
import { maxAmountSpend } from '../../utils/maxAmountSpend'
import { currencyId } from '../../utils/currencyId'
import { AutoColumn, ColumnCenter } from '../layout/Column'

const LiquidityPopUp = ({ history, swapCurrencyB, swapCurrencyA, handleClose, setcurrencyA1, setcurrencyB1 }) => {
  const { isDark, toggleTheme } = useTheme()

  const { account, chainId, library } = useActiveWeb3React()
  // const { INPUT, OUTPUT } = useSwapState()
  //   const swapCurrencyA = INPUT.currencyId
  //   const swapCurrencyB = OUTPUT.currencyId

  // get formatted amounts
  const { independentField, typedValue, otherTypedValue } = useMintState()

  console.log('swapCurrencyA', swapCurrencyA)

  console.log('swapCurrencyB', swapCurrencyB)

  const currencyA = useCurrency(swapCurrencyA)
  const currencyB = useCurrency(swapCurrencyB)
  console.log('currencyA', currencyA)

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

  console.log('currencies>>>>>>>>>', currencies)

  const { onFieldAInput, onFieldBInput } = useMintActionHandlers(noLiquidity)

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

  const handleCurrencyASelect = (currencyA_: Currency) => {
    console.log('currencyA_', currencyA_)
    const newCurrencyIdA = currencyId(currencyA_)
    //   const here =useCurrency(newCurrencyIdA)
    console.log('newCurrencyIdA', newCurrencyIdA)

    setcurrencyA1(newCurrencyIdA)

    //  setcurrencyA1(here)
    //   if (newCurrencyIdA === loadCurrencyIdB) {
    //     history.push(`/${loadCurrencyIdB}/${loadCurrencyIdA}`)
    //   } else if (loadCurrencyIdB) {
    //     history.push(`/${newCurrencyIdA}/${loadCurrencyIdB}`)
    //   } else {
    //     history.push(`/${newCurrencyIdA}`)
    //   }
    console.log('currencyA1', currencies[Field.CURRENCY_A])
  }

  const atMaxAmounts: { [field in Field]?: TokenAmount } = [Field.CURRENCY_A, Field.CURRENCY_B].reduce(
    (accumulator, field) => {
      return {
        ...accumulator,
        [field]: maxAmounts[field]?.equalTo(parsedAmounts[field] ?? '0'),
      }
    },
    {},
  )

  const handleCurrencyBSelect = (currencyB_: Currency) => {
    const newCurrencyIdB = currencyId(currencyB_)
    setcurrencyB1(currencyId(currencyB_))
    //   if (loadCurrencyIdA === newCurrencyIdB) {
    //     if (loadCurrencyIdB) {
    //       history.push(`/${loadCurrencyIdB}/${newCurrencyIdB}`)
    //     } else {
    //       history.push(`/${newCurrencyIdB}`)
    //     }
    //   } else {
    //     history.push(`/${loadCurrencyIdA || 'ETH'}/${newCurrencyIdB}`)
    //   }
    // },
  }

  return (
    <>
      <Modal minWidth="385px" maxWidth="100%" title="Provide Liquidity" onDismiss={handleClose}>
        <Flex sx={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', marginTop: '20px' }}>
          <Flex>
            <Text
              sx={{ fontSize: '16px', fontWeight: 700, lineHeight: '24px', color: isDark ? 'primaryBright' : 'brown' }}
            >
              Token 1
            </Text>
          </Flex>
          <Flex sx={{ alignItems: 'center' }}>
            <Text
              sx={{
                fontSize: '12px',
                fontWeight: 500,
                lineHeight: '14px',
                marginRight: '10px',
                color: isDark ? 'primaryBright' : 'brown',
              }}
            >
              Balance:123.456
            </Text>
            <Button
              // size="sm"
              sx={{ border: 'hidden', borderRadius: '6px', padding: '3px 14px !important' }}
              variant="primary"
            >
              <Text sx={{ fontSize: '16px', fontWeight: 500, lineHeight: '24px' }}>Max</Text>
            </Button>
          </Flex>
        </Flex>

        <CurrencyInputPanel
          value={formattedAmounts[Field.CURRENCY_A]}
          onUserInput={onFieldAInput}
          onMax={() => {
            onFieldAInput(maxAmounts[Field.CURRENCY_A]?.toExact() ?? '')
          }}
          onCurrencySelect={handleCurrencyASelect}
          showMaxButton={!atMaxAmounts[Field.CURRENCY_A]}
          currency={currencies[Field.CURRENCY_A]}
          addLiquidity
          id="add-liquidity-input-tokena"
          showCommonBases
        />
        {/* <ColumnCenter
          style={{
            position: 'relative',
            height: '0px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        > */}
        <Flex
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            backgroundColor: '#FFB300',
            borderRadius: '50px',
            width: '50px',
            height: '50px',
          }}
        >
          <Flex sx={{ justifyContent: 'center', margin: '10px 0' }}>
            <AddIcon width="20px" color="primaryBright" />
          </Flex>
        </Flex>
        <Flex sx={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <Flex>
            <Text
              sx={{ fontSize: '16px', fontWeight: 700, lineHeight: '24px', color: isDark ? 'primaryBright' : 'brown' }}
            >
              Token 2
            </Text>
          </Flex>
          <Flex sx={{ alignItems: 'center' }}>
            <Text
              sx={{
                fontSize: '12px',
                fontWeight: 500,
                lineHeight: '14px',
                marginRight: '10px',
                color: isDark ? 'primaryBright' : 'brown',
              }}
            >
              Balance:123.456
            </Text>
            <Button
              //  size="sm"
              sx={{ border: 'hidden', borderRadius: '6px', padding: '3px 14px !important' }}
              variant="primary"
            >
              <Text sx={{ fontSize: '16px', fontWeight: 500, lineHeight: '24px' }}>Max</Text>
            </Button>
          </Flex>
        </Flex>
        {/* </ColumnCenter> */}
        <CurrencyInputPanel
          value={formattedAmounts[Field.CURRENCY_B]}
          onUserInput={onFieldBInput}
          onCurrencySelect={handleCurrencyBSelect}
          onMax={() => {
            onFieldBInput(maxAmounts[Field.CURRENCY_B]?.toExact() ?? '')
          }}
          showMaxButton={!atMaxAmounts[Field.CURRENCY_B]}
          currency={currencies[Field.CURRENCY_B]}
          id="add-liquidity-input-tokenb"
          addLiquidity
          showCommonBases
        />
        <PoolPriceBar
          currencies={currencies}
          poolTokenPercentage={poolTokenPercentage}
          noLiquidity={noLiquidity}
          price={price}
          chainId={chainId}
        />
        <Button variant="primary">
          <Text sx={{ fontSize: '16px', lineHeight: '24px', fontWeight: 700 }}>CONNECT WALLET</Text>
        </Button>

        <UnderlinedButton text="cancel" handleClick={handleClose} />
      </Modal>
    </>
  )
}

export default LiquidityPopUp
