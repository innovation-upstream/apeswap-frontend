/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { AppThunk } from 'state/types'
import { MasterApeMigrationInterface } from './types'
import { getInitialMigrateLpStatus, mergeV1Products, mergeV2Products } from './utils'
// import { MigrationPhases, MigrationTimerState } from './types'

const initialState: MasterApeMigrationInterface = {
  migrationLoading: { userDataLoaded: false, mergedMigrationLoaded: false, allDataLoaded: false },
  activeIndex: 0,
  v1Products: [],
  v2Products: [],
  migrateLpStatus: [],
  migrationCompleteLog: [],
  transactions: [],
  migrateMaximizers: false,
}

export const masterApeMigrationSlice = createSlice({
  name: 'masterApeMigration',
  initialState,
  reducers: {
    setMigrationLoading: (state, action) => {
      state.migrationLoading = { ...state.migrationLoading, ...action.payload }
    },
    setActiveIndex: (state, action) => {
      state.activeIndex = action.payload
    },
    setV1Products: (state, action) => {
      state.v1Products = action.payload
    },
    setV2Products: (state, action) => {
      state.v2Products = action.payload
    },
    setMigrateLpStatus: (state, action) => {
      state.migrateLpStatus = action.payload
    },
    setMigrationCompletionLog: (state, action) => {
      state.migrationCompleteLog = action.payload
    },
    setMigrateMaximizers: (state, action) => {
      state.migrateMaximizers = action.payload
    },
    setAddTransactions: (state, action) => {
      state.transactions = [...state.transactions, action.payload]
    },
    setRemoveTransactions: (state, action) => {
      const newTransactionList = state.transactions.filter((tx) => tx.id !== action.payload.id)
      state.transactions = newTransactionList
    },
  },
})

// Actions
export const {
  setMigrationLoading,
  setActiveIndex,
  setV1Products,
  setV2Products,
  setMigrateLpStatus,
  setMigrationCompletionLog,
  setMigrateMaximizers,
  setAddTransactions,
  setRemoveTransactions,
} = masterApeMigrationSlice.actions

// Thunks
export const fetchV1Products =
  (chainId: number): AppThunk =>
  (dispatch, getState) => {
    try {
      const farms = getState().farms.data
      const vaults = getState().vaults.data
      const farmsV2 = getState().farmsV2.data
      const v1Products = mergeV1Products(farms, farmsV2, vaults, chainId)
      dispatch(setV1Products(v1Products))
      dispatch(setMigrationLoading({ mergedMigrationLoaded: true }))
    } catch (error) {
      console.warn(error)
    }
  }

export const fetchV2Products =
  (chainId: number): AppThunk =>
  (dispatch, getState) => {
    try {
      const vaultsV3 = getState().vaultsV3.data
      const farmsV2 = getState().farmsV2.data
      const v2Products = mergeV2Products(farmsV2, vaultsV3, chainId)
      dispatch(setV2Products(v2Products))
      dispatch(setMigrationLoading({ mergedMigrationLoaded: true }))
    } catch (error) {
      console.warn(error)
    }
  }

export const setInitializeMigrateStatus =
  (chainId: number): AppThunk =>
  (dispatch, getState) => {
    try {
      const { v1Products, v2Products } = getState().masterApeMigration
      const farmsV2 = getState().farms.data
      const mergedLpStatus = getInitialMigrateLpStatus(v1Products, v2Products, farmsV2, chainId)
      dispatch(setMigrateLpStatus(mergedLpStatus))
      dispatch(setMigrationLoading({ allDataLoaded: true }))
    } catch (error) {
      console.warn(error)
    }
  }

export default masterApeMigrationSlice.reducer
