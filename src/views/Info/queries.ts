export const tokensQuery = (amount: number) => {
  return {
    query:
      'query tokens { tokens(first: ' +
      amount +
      ', orderBy: tradeVolumeUSD orderDirection: desc) {  id name symbol tradeVolumeUSD totalLiquidity derivedETH }  }',
  }
}

export const transactionsQuery = (amount: number) => {
  return {
    query:
      'query transactions {\n' +
      '    transactions(first: ' +
      amount +
      ', orderBy: timestamp, orderDirection: desc) {\n' +
      '      swaps(orderBy: timestamp, orderDirection: desc) {\n' +
      '        transaction {\n' +
      '          id\n' +
      '          timestamp\n' +
      '        }\n' +
      '        pair {\n' +
      '          token0 {\n' +
      '            id\n' +
      '            symbol\n' +
      '          }\n' +
      '          token1 {\n' +
      '            id\n' +
      '            symbol\n' +
      '          }\n' +
      '        }\n' +
      '        amount0In\n' +
      '        amount0Out\n' +
      '        amount1In\n' +
      '        amount1Out\n' +
      '        amountUSD\n' +
      '        to\n' +
      '      }\n' +
      '    }\n' +
      '  }',
  }
}

export const nativePricesQuery = {
  query: 'query bundles { bundles {id ethPrice }}',
}
