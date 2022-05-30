import { Flex, Svg, Text, useModal } from '@ape.swap/uikit'
import { Currency } from '@apeswapfinance/sdk'
import { CurrencyLogo } from 'components/Logo'
import CurrencySearchModal from 'components/SearchModal/CurrencySearchModal'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import React, { useCallback, useState } from 'react'
import { styles } from './styles'

const TokenSelector: React.FC<{
  currency: Currency
  otherCurrency: Currency
  onCurrencySelect: (currency: Currency) => void
  showCommonBases?: boolean
}> = ({ currency, onCurrencySelect, otherCurrency, showCommonBases = false }) => {
  const { chainId } = useActiveWeb3React()

  const [onPresentCurrencyModal] = useModal(
    <CurrencySearchModal
      onCurrencySelect={onCurrencySelect}
      selectedCurrency={currency}
      otherSelectedCurrency={otherCurrency}
      showCommonBases={showCommonBases}
    />,
  )
  return (
    <Flex sx={{ ...styles.primaryFlex }} onClick={onPresentCurrencyModal}>
      <CurrencyLogo currency={currency} size="30px" />
      <Text sx={{ ...styles.tokenText }}>{currency?.getSymbol(chainId)}</Text>
      <Svg icon="caret" />
    </Flex>
  )
}

export default React.memo(TokenSelector)
