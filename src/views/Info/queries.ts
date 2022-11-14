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
      'query transactions {' +
      '    transactions(first: ' +
      amount +
      ', orderBy: timestamp, orderDirection: desc) {' +
      '      swaps(orderBy: timestamp, orderDirection: desc) {' +
      '        transaction {' +
      '          id' +
      '          timestamp' +
      '        }' +
      '        pair {' +
      '          token0 {' +
      '            id' +
      '            symbol' +
      '          }' +
      '          token1 {' +
      '            id' +
      '            symbol' +
      '          }' +
      '        }' +
      '        amount0In' +
      '        amount0Out' +
      '        amount1In' +
      '        amount1Out' +
      '        amountUSD' +
      '        to' +
      '      }' +
      '    }' +
      '  }',
  }
}

export const nativePricesQuery = {
  query: 'query bundles { bundles {id ethPrice }}',
}

export const daysDataQuery = (oneDayBack: number) => {
  return {
    query:
      'query uniswapDayDatas {' +
      '    uniswapDayDatas(first: 1, skip: 0, where: { date_gt: ' +
      oneDayBack +
      ' }, orderBy: date, orderDirection: asc) {' +
      '      id' +
      '      date' +
      '      totalVolumeUSD' +
      '      dailyVolumeUSD' +
      '      dailyVolumeETH' +
      '      totalLiquidityUSD' +
      '      totalLiquidityETH' +
      '      txCount' +
      '    }' +
      '  }',
  }
}

export const blocksQuery = (startTimestamp: number, currentTimestamp: number) => {
  return {
    query:
      'query blocks { blocks(first: 1 orderBy: timestamp orderDirection: asc where: { timestamp_gt: ' +
      startTimestamp +
      ', timestamp_lt: ' +
      currentTimestamp +
      '}' +
      '    ) {' +
      '      id' +
      '      number' +
      '      timestamp' +
      '    }' +
      '  }',
  }
}

// export const uniswapFactoriesQuery = (chainId: string, blockN: number) => {
//   return {
//     query:
//       'query uniswapFactories { uniswapFactories(block: { number: ' +
//       blockN +
//       ' } where: {id: "' +
//       chainId +
//       '"}) { id totalVolumeUSD totalVolumeETH untrackedVolumeUSD totalLiquidityUSD totalLiquidityETH txCount pairCount } }',
//   }
// }

export const uniswapFactoriesQuery = (chainId: string, block: string) => {
  return {
    query:
      'query uniswapFactories { uniswapFactories(block: { number:' +
      block +
      '} where: {id: "0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6"}) { id totalVolumeUSD totalVolumeETH untrackedVolumeUSD totalLiquidityUSD totalLiquidityETH txCount pairCount } }',
  }
}
