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
const AAVE_LIST = 'tokenlist.aave.eth'

// lower index == higher priority for token import
export const DEFAULT_LIST_OF_LISTS: string[] = [
  NFT_INDEX,
  COINGECKO_LIST,
  CMC_ALL_LIST,
  PANCAKE_EXTENDED,
  UNI_LIST,
  AAVE_LIST,
  ...UNSUPPORTED_LIST_URLS, // need to load unsupported tokens as well
]

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = []
