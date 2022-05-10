import React, { Dispatch, useEffect, useState } from 'react'
import { Currency, Pair, Token } from '@apeswapfinance/sdk'
import { Button, Text, useModal, Flex, ArrowDropDownIcon, useMatchBreakpoints } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getTokenUsdPrice } from 'utils/getTokenUsdPrice'
import { useCurrencyBalance } from '../../../state/wallet/hooks'
import CurrencySearchModal from '../../SearchModal/CurrencySearchModal'
import { CurrencyLogo, DoubleCurrencyLogo } from '../../Logo'
import { RowBetween } from '../../layout/Row'
import NumericalInput from './NumericalInput'

const InputPanel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  border-radius: 10px;
  z-index: 1;
`
const Container = styled.div<{ removeLiquidity: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white4};
`

const CurrencyInputContainer = styled.div<{ removeLiquidity: boolean }>`
  background-color: ${({ theme }) => theme.colors.white4};
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 20px;
`
interface CurrencyInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  onMax?: () => void
  showMaxButton: boolean
  label?: string
  onCurrencySelect: (currency: Currency) => void
  currency?: Currency | null
  disableCurrencySelect?: boolean
  hideBalance?: boolean
  pair?: Pair | null
  otherCurrency?: Currency | null
  id: string
  isLp?: boolean
  showCommonBases?: boolean
  removeLiquidity?: boolean
  addLiquidity?: boolean
  setDollarbuttons: Dispatch<any>
}
export default function CurrencyInputPanelRoi({
  value,
  onUserInput,
  onMax,
  showMaxButton,
  label,
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  isLp = false,
  hideBalance = false,
  pair = null, // used for double token logo
  otherCurrency,
  id,
  showCommonBases,
  removeLiquidity,
  addLiquidity,
  setDollarbuttons,
}: CurrencyInputPanelProps) {
  const { account, chainId } = useActiveWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)

  const [tokenPrice, setTokenPrice] = useState<number>(null)
  const isNative = currency?.symbol === 'ETH'

  useEffect(() => {
    const fetchTokenPrice = async () => {
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
  }, [currency, chainId, isLp, isNative])
  return (
    <CurrencyInputContainer removeLiquidity={removeLiquidity}>
      <Flex style={{ position: 'relative' }}>
        <Button
          onClick={onMax}
          variant="primary"
          style={{
            margin: '0',
            padding: '0',
            fontSize: '16px',
            borderRadius: '6px',
            fontWeight: 500,
            lineHeight: 0,
            width: '62px',
            height: '30px',
          }}
        >
          MAX
        </Button>
      </Flex>
      <InputPanel id={id}>
        <Container removeLiquidity={removeLiquidity}>
          <RowBetween>
            <NumericalInput
              id="token-amount-input"
              removeLiquidity={removeLiquidity}
              value={value}
              onUserInput={(val) => {
                setDollarbuttons(null)
                onUserInput(val)
              }}
            />
          </RowBetween>
          <Text
            fontSize="14px"
            style={{
              display: 'inline',
              position: 'absolute',
              bottom: '-20px',
              right: '10px',
            }}
          >
            {!hideBalance && !!currency && value
              ? isLp
                ? `~ $${(
                    tokenPrice *
                    (parseFloat(selectedCurrencyBalance?.toSignificant(6)) * (parseInt(value) / 100))
                  )?.toFixed(2)}`
                : `~ $${(tokenPrice * parseFloat(value))?.toFixed(2)}`
              : ' -'}
          </Text>
        </Container>
      </InputPanel>
    </CurrencyInputContainer>
  )
}
