import { useEffect, useState } from 'react'

type tokenUrl = string[]

const useTokenUrl = (tokens?: string[]) => {
  const [tokenUrls, setTokenUrls] = useState<tokenUrl[]>([])

  useEffect(() => {
    if (!tokens) return
    const urls = tokens?.map((tokenSymbol) => [
      `https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/${tokenSymbol.toUpperCase()}.svg`,
      `https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/${tokenSymbol.toUpperCase()}.png`,
    ])
    setTokenUrls(urls)
  }, [tokens])

  return tokenUrls
}

export default useTokenUrl
