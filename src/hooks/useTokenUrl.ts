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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(tokens || [])])

  return tokenUrls
}

export default useTokenUrl
