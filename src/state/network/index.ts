/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Cookies from 'universal-cookie'
import { CHAIN_ID, NETWORK_LABEL } from 'config/constants/chains'
import { Network, NetworkState } from 'state/types'
import fetchAndUpdateNetwork from './fetchNetwork'

const isBrowser = typeof window === 'object'
const cookies = new Cookies()

const chainIdSafeCheck = (): { chainId: number; chainIdFromUrl: boolean } => {
  const search = isBrowser ? window.location.search : ''
  const params = new URLSearchParams(search)
  const chainStr = params.get('chain')
  const removeChainParamUrl = isBrowser ? window.location.href.split('?chain')[0] : ''
  if (isBrowser) window.history.pushState({}, document.title, removeChainParamUrl)
  const cookieChain = parseInt(cookies.get('chainIdStatus') || CHAIN_ID.BSC.toString())
  if (chainStr) {
    if (chainStr.toLowerCase() === NETWORK_LABEL[CHAIN_ID.BSC].toLowerCase()) {
      return { chainId: CHAIN_ID.BSC, chainIdFromUrl: true }
    }
    if (chainStr.toLowerCase() === NETWORK_LABEL[CHAIN_ID.MATIC].toLowerCase()) {
      return { chainId: CHAIN_ID.MATIC, chainIdFromUrl: true }
    }
    return { chainId: cookieChain || CHAIN_ID.BSC, chainIdFromUrl: false }
  }
  return { chainId: cookieChain || CHAIN_ID.BSC, chainIdFromUrl: false }
}

const { chainId: initChainId, chainIdFromUrl } = chainIdSafeCheck()

const initialState: NetworkState = {
  isInitialized: false,
  isLoading: true,
  data: { chainId: initChainId, chainIdFromUrl },
}

export const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    networkFetchStart: (state) => {
      state.isLoading = true
    },
    networkFetchSucceeded: (state, action: PayloadAction<Network>) => {
      state.isInitialized = true
      state.isLoading = false
      state.data = action.payload
    },
    networkFetchFailed: (state) => {
      state.isLoading = false
      state.isInitialized = true
    },
    setNetwork: (state, action) => {
      state.isInitialized = true
      state.isLoading = false
      state.data.chainId = action.payload.chainId
    },
    setChainIdFromUrl: (state, action) => {
      state.isInitialized = true
      state.isLoading = false
      state.data.chainIdFromUrl = action.payload.chainIdFromUrl
    },
  },
})

// Actions
export const { networkFetchStart, networkFetchSucceeded, networkFetchFailed, setNetwork, setChainIdFromUrl } =
  networkSlice.actions

// thunks
export const fetchUserNetwork = (web3ChainId: number, account: string, chainId: number) => (dispatch) => {
  try {
    dispatch(networkFetchStart())
    const network = fetchAndUpdateNetwork(web3ChainId, account, chainId)
    dispatch(setNetwork(network))
    new Cookies().set('chainIdStatus', network.chainId)
    localStorage.setItem(`chainIdStatus`, JSON.stringify(network.chainId))
  } catch (error) {
    dispatch(networkFetchFailed())
  }
}

export const fetchChainIdFromUrl = (updatedChainIdFromUrl: boolean) => (dispatch) => {
  dispatch(setChainIdFromUrl(updatedChainIdFromUrl))
}

export default networkSlice.reducer
