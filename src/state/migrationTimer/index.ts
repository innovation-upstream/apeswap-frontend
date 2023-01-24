/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { MigrationPhases, MigrationTimerState } from './types'

const initialState: MigrationTimerState = {
  data: {
    migrationPhase: null,
    migrationPhaseTimes: {
      [MigrationPhases.MIGRATE_PHASE_0]: 1674583200,
      [MigrationPhases.MIGRATE_PHASE_1]: 1674585000,
      [MigrationPhases.MIGRATE_PHASE_2]: 1674586800,
    },
  },
}

export const migrationTimerSlice = createSlice({
  name: 'migrationTimer',
  initialState,
  reducers: {
    setMigrationPhase: (state, action) => {
      state.data.migrationPhase = action.payload
    },
  },
})

// Actions
export const { setMigrationPhase } = migrationTimerSlice.actions

export default migrationTimerSlice.reducer
