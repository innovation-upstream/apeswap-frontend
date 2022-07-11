// used to mark unsupported tokens, these are hosted lists of unsupported tokens
/**
 * @TODO add list from blockchain association
 */
export const UNSUPPORTED_LIST_URLS: string[] = []

const NFT_INDEX = 'https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/lists/nftindex.json'
const PANCAKE_EXTENDED = 'https://tokens.pancakeswap.finance/pancakeswap-extended.json'
const CMC_ALL_LIST = 'https://api.coinmarketcap.com/data-api/v3/uniswap/all.json'
const COINGECKO_LIST = 'https://tokens.coingecko.com/uniswap/all.json'
const UNI_LIST = 'https://tokens.uniswap.org'

// lower index == higher priority for token import
export const DEFAULT_LIST_OF_LISTS: string[] = [
  NFT_INDEX,
  // COINGECKO_LIST,
  // CMC_ALL_LIST,
  PANCAKE_EXTENDED,
  UNI_LIST,
  ...UNSUPPORTED_LIST_URLS, // need to load unsupported tokens as well
]

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = []

interface ExtendedListType {
  name: string
  warning: string
  logo: string
}

// Original list name
export const EXTENDED_LIST_DETAILS: Record<string, ExtendedListType> = {
  'PancakeSwap Extended': {
    name: "Harambe's List",
    warning: 'This is a degen list from harambe',
    logo: 'https://i.natgeofe.com/n/a01c6860-3b1b-408b-b695-b9e0d78699f1/01-gorilla-harambe-death_2x3.jpg',
  },
}
