/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import vaultsConfig from 'config/constants/vaults'
import fetchVaultData from './fetchVaultData'
import {
  fetchVaultUserAllowances,
  fetchVaultUserStakedAndPendingBalances,
  fetchVaultUserTokenBalances,
} from './fetchVaultsUser'
import { VaultsState, TokenPrices, Vault, FarmLpAprsType } from '../types'
import fetchVaults from './fetchVaults'

const initialState: VaultsState = { data: [], loadVaultData: false, userDataLoaded: false }

export const vaultSlice = createSlice({
  name: 'Vaults',
  initialState,
  reducers: {
    setLoadVaultData: (state, action) => {
      const liveVaultsData: Vault[] = action.payload
      state.data = state.data.map((vault) => {
        const liveVaultData = liveVaultsData.find((entry) => entry.id === vault.id)
        return { ...vault, ...liveVaultData }
      })
    },
    setVaultUserData: (state, action) => {
      const userData = action.payload
      state.data = state.data.map((vault) => {
        const userVaultData = userData.find((entry) => entry.id === vault.id)
        return { ...vault, userData: userVaultData }
      })
    },
    updateVaultsUserData: (state, action) => {
      const { field, value, id } = action.payload
      const index = state.data.findIndex((v) => v.id === id)
      state.data[index] = { ...state.data[index], userData: { ...state.data[index].userData, [field]: value } }
    },
    setVaults: (state, action) => {
      if (!state.loadVaultData) {
        state.data = action.payload
      }
    },
    setVaultsLoad: (state, action) => {
      state.loadVaultData = action.payload
    },
  },
})

// thunks
export const fetchVaultsPublicDataAsync =
  (chainId: number, tokenPrices: TokenPrices[], farmLpAprs: FarmLpAprsType) => async (dispatch) => {
    try {
      console.log(farmLpAprs)
      const vaults = await fetchVaults(chainId, tokenPrices, farmLpAprs)
      dispatch(setLoadVaultData(vaults))
    } catch (error) {
      console.warn(error)
    }
  }

export const fetchVaultUserDataAsync = (account: string, chainId: number) => async (dispatch) => {
  try {
    const filteredVaults = vaultsConfig.filter((vault) => vault.availableChains.includes(chainId))
    const userVaultAllowances = await fetchVaultUserAllowances(account, chainId)
    const userVaultTokenBalances = await fetchVaultUserTokenBalances(account, chainId)
    const userVaultBalances = await fetchVaultUserStakedAndPendingBalances(account, chainId)
    const userData = filteredVaults.map((vault, index) => {
      return {
        id: vault.id,
        allowance: userVaultAllowances[index],
        tokenBalance: userVaultTokenBalances[index],
        stakedBalance: userVaultBalances.stakedBalances[index],
        pendingRewards: userVaultBalances.pendingRewards[index],
      }
    })
    dispatch(setVaultUserData(userData))
  } catch (error) {
    console.warn(error)
  }
}

export const setFilteredVaults = (chainId: number) => async (dispatch) => {
  const filteredVaults = vaultsConfig.filter((vault) => vault.availableChains.includes(chainId))
  dispatch(setVaults(filteredVaults))
  dispatch(setVaultsLoad(true))
}

export const updateVaultUserAllowance = (account: string, chainId: number, id: number) => async (dispatch) => {
  const allowances = await fetchVaultUserAllowances(account, chainId)
  const filteredVaults = vaultsConfig.filter((vault) => vault.availableChains.includes(chainId))
  const index = filteredVaults.findIndex((v) => v.pid === id)
  dispatch(updateVaultsUserData({ id, field: 'allowance', value: allowances[index] }))
}

export const updateVaultUserBalance = (account: string, chainId: number, id: number) => async (dispatch) => {
  const tokenBalances = await fetchVaultUserTokenBalances(account, chainId)
  const filteredVaults = vaultsConfig.filter((vault) => vault.availableChains.includes(chainId))
  const index = filteredVaults.findIndex((v) => v.id === id)
  dispatch(updateVaultsUserData({ id, field: 'tokenBalance', value: tokenBalances[index] }))
}

export const updateVaultUserStakedBalance = (account: string, chainId: number, id: number) => async (dispatch) => {
  const stakedBalances = await fetchVaultUserStakedAndPendingBalances(account, chainId)
  const filteredVaults = vaultsConfig.filter((vault) => vault.availableChains.includes(chainId))
  const index = filteredVaults.findIndex((v) => v.id === id)
  dispatch(updateVaultsUserData({ id, field: 'stakedBalance', value: stakedBalances.stakedBalances[index] }))
}

// Actions
export const { setLoadVaultData, setVaultUserData, setVaults, setVaultsLoad, updateVaultsUserData } = vaultSlice.actions

export default vaultSlice.reducer
