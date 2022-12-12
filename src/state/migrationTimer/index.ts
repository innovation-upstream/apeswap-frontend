/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { MigrationPhases, MigrationTimerState } from './types'

const initialState: MigrationTimerState = {
  data: {
    migrationPhase: null,
    migrationPhaseTimes: {
      [MigrationPhases.MIGRATE_PHASE_0]: 1670854480,
      [MigrationPhases.MIGRATE_PHASE_1]: 1670874980,
      [MigrationPhases.MIGRATE_PHASE_2]: 1670974980,
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
