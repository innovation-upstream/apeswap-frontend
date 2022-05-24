import React from 'react'
import { useCurrency } from 'hooks/Tokens'
import { useDefaultsFromURLSearch } from 'state/swap/hooks'

const Swap: React.FC = () => {
  const loadedUrlParams = useDefaultsFromURLSearch()

  // token warning stuff
  const [loadedInputCurrency, loadedOutputCurrency] = [
    useCurrency(loadedUrlParams?.inputCurrencyId),
    useCurrency(loadedUrlParams?.outputCurrencyId),
  ]

  return <></>
}

export default React.memo(Swap)
