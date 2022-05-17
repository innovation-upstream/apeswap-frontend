import React, { useEffect, useState } from 'react'
import { Currency, Token } from '@apeswapfinance/sdk'
import { Button, Text } from '@ape.swap/uikit'
import { Flex } from 'theme-ui'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getTokenUsdPrice } from 'utils/getTokenUsdPrice'
import maxAmountSpend from 'utils/maxAmountSpend'
import NumericalInput from 'components/CurrencyInputPanel/NumericalInput'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import { RowBetween } from '../layout/Row'
import styles from './styles'

interface CurrencyInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  currency?: Currency | null
  isLp?: boolean
  removeLiquidity?: boolean
}

export default function CurrencyInputPanelRoi({
  value,
  onUserInput,
  currency,
  isLp,
  removeLiquidity,
}: CurrencyInputPanelProps) {
  const { account, chainId } = useActiveWeb3React()
  const [inputValue, setInputValue] = useState('0')
  const [outputValue, setOutputValue] = useState('0')
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)

  const [tokenPrice, setTokenPrice] = useState<number>(null)
  const maxAmount = maxAmountSpend(selectedCurrencyBalance)?.toExact() || '0'

  useEffect(() => {
    if (!currency) return
    const fetchTokenPrice = async () => {
      const isNative = currency?.symbol === 'ETH'
      const tokenPriceReturned = await getTokenUsdPrice(
        chainId,
        currency instanceof Token ? currency?.address : '',
        currency?.decimals,
        isLp,
        isNative,
      )
      setTokenPrice(tokenPriceReturned)
    }
    fetchTokenPrice()
  }, [currency, chainId, isLp])

  useEffect(() => {
    if (!value) return
    const expectedValue = parseFloat(!!currency && value ? (parseFloat(value) / tokenPrice)?.toFixed(2) : '0')

    setInputValue(Number.isFinite(expectedValue) ? expectedValue.toString() : '0')
  }, [currency, isLp, selectedCurrencyBalance, tokenPrice, value])

  useEffect(() => {
    const fiatValue = parseFloat(!!currency && inputValue ? (tokenPrice * parseFloat(inputValue))?.toFixed(2) : '0')

    setOutputValue(Number.isFinite(fiatValue) ? fiatValue.toString() : '0')
  }, [currency, inputValue, isLp, onUserInput, selectedCurrencyBalance, tokenPrice])

  return (
    <Flex sx={styles.container}>
      <Flex sx={{ position: 'relative' }}>
        <Button
          onClick={() => {
            setInputValue(maxAmount)
            onUserInput(maxAmount)
          }}
          variant="primary"
          csx={styles.maxButton}
        >
          MAX
        </Button>
      </Flex>
      <Flex sx={styles.inputSection as any}>
        <RowBetween>
          <NumericalInput
            id="token-amount-input"
            removeLiquidity={removeLiquidity}
            value={inputValue}
            align="right"
            width="full"
            fontWeight={700}
            onUserInput={(val) => {
              setInputValue(val)
              onUserInput(val)
            }}
          />
        </RowBetween>
        <Text weight="light" variant="sm">
          {value || outputValue ? `~ $${value || outputValue}` : ' -'}
        </Text>
      </Flex>
    </Flex>
  )
}
