/** @jsxImportSource theme-ui */
import React, { useCallback } from 'react'
import { Flex } from '@ape.swap/uikit'
import { RouteComponentProps } from 'react-router-dom'
import { useUserRecentTransactions } from 'state/user/hooks'
import { Field } from 'state/zap/actions'
import { dexStyles } from '../styles'
import DexNav from '../components/DexNav'
import MyPositions from '../components/MyPositions'
import RecentTransactions from '../components/RecentTransactions'
import LiquiditySelector from './components/LiquiditySelector'
import ZapLiquidity from 'components/DualAddLiquidity/ZapLiquidity'
import { useZapState } from 'state/zap/hooks'

export enum LiquidityTypes {
  ADD = 'ADD',
  ZAP = 'ZAP',
  MIGRATE = 'MIGRATE',
}

const emptyOutput = {
  lpSymbol: '',
  lpAddress: '',
  currency1: '',
  currency1Symbol: '',
  currency2: '',
  currency2Symbol: '',
  userBalance: null,
}

function ZapLiquidityWrapper({
  match: {
    params: { currencyIdA, currencyIdB },
  },
  history,
}: RouteComponentProps<{ currencyIdA?: string; currencyIdB?: string }>) {
  const onChangeLiquidityType = useCallback(
    (newLiquidityType: LiquidityTypes) => {
      if (newLiquidityType === LiquidityTypes.ADD) history.push('/add')
    },
    [history],
  )

  const [recentTransactions] = useUserRecentTransactions()

  const { INPUT, OUTPUT, zapOutputList } = useZapState()

  const currencyA = currencyIdA || INPUT.currencyId
  const currencyB = currencyIdB || OUTPUT.lpAddress

  const outputCurrency = currencyIdB
    ? zapOutputList?.find((farm) => farm.lpAddress === currencyB) || emptyOutput
    : OUTPUT

  const handleCurrenciesURL = useCallback(
    (field: Field, currency: string) => {
      const newCurrencyId = currency
      if (field === Field.INPUT) {
        if (newCurrencyId === currencyIdB) {
          history.push(`/zap/${currencyIdB}/${currencyIdA}`)
        } else if (currencyIdB) {
          history.push(`/zap/${newCurrencyId}/${currencyIdB}`)
        } else {
          history.push(`/zap/${newCurrencyId}`)
        }
      } else if (field === Field.OUTPUT) {
        if (newCurrencyId === currencyIdA) {
          if (currencyIdB) {
            history.push(`/zap/${currencyIdB}/${newCurrencyId}`)
          } else {
            history.push(`/zap/${newCurrencyId}`)
          }
        } else {
          history.push(`/zap/${currencyIdA || 'ETH'}/${newCurrencyId}`)
        }
      }
    },
    [currencyIdA, history, currencyIdB],
  )

  return (
    <Flex sx={dexStyles.pageContainer}>
      <Flex sx={{ flexDirection: 'column' }}>
        <Flex sx={dexStyles.dexContainer}>
          <DexNav />
          <MyPositions />
          <LiquiditySelector liquidityType={LiquidityTypes.ZAP} onChangeLiquidityType={onChangeLiquidityType} />
          <ZapLiquidity
            currencyIdA={currencyA}
            currencyIdB={outputCurrency}
            handleCurrenciesURL={handleCurrenciesURL}
          />
        </Flex>
        {recentTransactions && <RecentTransactions />}
      </Flex>
    </Flex>
  )
}

export default React.memo(ZapLiquidityWrapper)
