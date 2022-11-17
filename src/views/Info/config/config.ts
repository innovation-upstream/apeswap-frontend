export interface Chain {
  chain: string
  graphAddress: string
  explorer: string
  blockGraph: string
  id: string
  fee: number
  chainId: number
}

export const CHAINS = [
  {
    chain: 'bnb',
    graphAddress: 'https://bnb.apeswapgraphs.com/subgraphs/name/ape-swap/apeswap-subgraph',
    explorer: 'https://bscscan.com/',
    blockGraph: 'https://api.thegraph.com/subgraphs/name/matthewlilley/bsc-blocks',
    id: '0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6',
    fee: 0.002,
    color: '#FAB701',
    chainId: 56,
  },
  {
    chain: 'polygon',
    graphAddress: 'https://api.thegraph.com/subgraphs/name/prof-sd/as-matic-graft',
    explorer: 'https://polygonscan.com/',
    blockGraph: 'https://api.thegraph.com/subgraphs/name/matthewlilley/polygon-blocks',
    id: '0xcf083be4164828f00cae704ec15a36d711491284',
    fee: 0.002,
    color: '#8C3EED',
    chainId: 137,
  },
  {
    chain: 'ethereum',
    graphAddress: 'https://api.thegraph.com/subgraphs/name/apeswapfinance/ethereum-dex',
    explorer: 'https://etherscan.com/',
    blockGraph: 'https://api.thegraph.com/subgraphs/name/blocklytics/ethereum-blocks',
    id: '0xBAe5dc9B19004883d0377419FeF3c2C8832d7d7B',
    fee: 0.002,
    color: '#637DEA',
    chainId: 1,
  },
  {
    chain: 'telos',
    graphAddress: 'https://telos.apeswapgraphs.com/subgraphs/name/ape-swap/apeswap-subgraph-telos',
    explorer: 'https://teloscan.com/',
    blockGraph: 'https://telos.apeswapgraphs.com/subgraphs/name/ape-swap/telos-blocks',
    id: '0x411172Dfcd5f68307656A1ff35520841C2F7fAec',
    fee: 0.002,
    color: '#9D68E8',
    chainId: 40,
  },
]
