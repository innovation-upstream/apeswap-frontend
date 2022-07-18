// used to mark unsupported tokens, these are hosted lists of unsupported tokens
/**
 * @TODO add list from blockchain association
 */
export const UNSUPPORTED_LIST_URLS: string[] = []

const NFT_INDEX = 'https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/lists/nftindex.json'
const PANCAKE_EXTENDED = 'https://tokens.pancakeswap.finance/pancakeswap-extended.json'
// const CMC_ALL_LIST = 'https://api.coinmarketcap.com/data-api/v3/uniswap/all.json'
// const COINGECKO_LIST = 'https://tokens.coingecko.com/uniswap/all.json'
const UNI_LIST = 'https://tokens.uniswap.org'
const QUICKSWAP = 'https://unpkg.com/quickswap-default-token-list@1.2.18/build/quickswap-default.tokenlist.json'

// lower index == higher priority for token import
export const DEFAULT_LIST_OF_LISTS: string[] = [
  NFT_INDEX,
  QUICKSWAP,
  UNI_LIST,
  // COINGECKO_LIST,
  // CMC_ALL_LIST,
  PANCAKE_EXTENDED,
  ...UNSUPPORTED_LIST_URLS, // need to load unsupported tokens as well
]

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = [UNI_LIST]

interface ExtendedListType {
  name: string
  warning: string
  logo: string
}

// Original list name
export const EXTENDED_LIST_DETAILS: Record<string, ExtendedListType> = {
  'PancakeSwap Extended': {
    name: "Harambe's List",
    warning:
      'The ApeSwap DEX is decentralized, meaning that anyone can create or add liquidity for a token. Not all tokens on this list have been reviewed by ApeSwap or passed our due diligence process. Some tokens on this list may present scam risks, including the loss of funds.',
    logo: 'https://i.natgeofe.com/n/a01c6860-3b1b-408b-b695-b9e0d78699f1/01-gorilla-harambe-death_2x3.jpg',
  },
  'Quickswap Token List': {
    name: 'Polygon List',
    warning:
      'The ApeSwap DEX is decentralized, meaning that anyone can create or add liquidity for a token. Not all tokens on this list have been reviewed by ApeSwap or passed our due diligence process. Some tokens on this list may present scam risks, including the loss of funds.',
    logo: '',
  },
}
