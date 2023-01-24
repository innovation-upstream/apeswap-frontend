import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useBlockNumber from 'lib/hooks/useBlockNumber'
import { useAppDispatch } from '../index'
import { State } from 'state/types'
import { MigrateStatus, MigrationCompleteLog, ProductTypes } from './types'
import {
  fetchV1Products,
  fetchV2Products,
  setAddCompletionLog,
  setRemoveTransactions,
  updateAndMergeStatus,
  updateMigrateStatus,
} from './reducer'
import { updateFarmV2UserAllowances, updateFarmV2UserTokenBalances } from 'state/farmsV2'
import { updateFarmUserStakedBalances, updateFarmUserTokenBalances } from 'state/farms'
import { updateVaultUserBalance, updateVaultUserStakedBalance } from 'state/vaults'
import { updateVaultV3UserAllowance } from 'state/vaultsV3'
import { delay } from 'lodash'

export function shouldCheck(
  currentBlock: number,
  tx: { addedTime: number; receipt?: any; lastCheckedBlockNumber?: number },
): boolean {
  if (tx.receipt) return false
  if (!tx.lastCheckedBlockNumber) return true
  const blocksSinceCheck = currentBlock - tx.lastCheckedBlockNumber
  if (blocksSinceCheck < 1) return false
  const minutesPending = (new Date().getTime() - tx.addedTime) / 1000 / 60
  if (minutesPending > 60) {
    // every 10 blocks if pending for longer than an hour
    return blocksSinceCheck > 9
  }
  if (minutesPending > 5) {
    // every 3 blocks if pending more than 5 minutes
    return blocksSinceCheck > 2
  }
  // otherwise every block
  return true
}

export default function Updater(): null {
  const { library, chainId, account } = useActiveWeb3React()

  const currentBlock = useBlockNumber()

  const dispatch = useAppDispatch()
  const transactions = useSelector((state: State) => state.masterApeMigration.transactions)

  const migrateMaximizers = useSelector((state: State) => state.masterApeMigration.migrateMaximizers)

  useEffect(() => {
    if (!chainId || !library || !currentBlock || transactions.length === 0) return
    transactions.forEach(
      ({
        hash,
        migrateLpType,
        id,
        v2FarmPid,
        v1FarmPid,
        v1VaultPid,
        v3VaultPid,
        lpAddress,
        type,
        symbol,
        location,
        stakeAmount,
      }) => {
        library
          .waitForTransaction(hash)
          .then((receipt) => {
            if (receipt) {
              if (type === 'unstake') {
                dispatch(updateFarmV2UserTokenBalances(chainId, v2FarmPid, account))
                if (migrateLpType === ProductTypes.FARM) {
                  dispatch(updateFarmUserStakedBalances(chainId, v1FarmPid, account))
                  dispatch(updateFarmUserTokenBalances(chainId, v1FarmPid, account))
                } else {
                  dispatch(updateVaultUserStakedBalance(account, chainId, v1VaultPid))
                  dispatch(updateVaultUserBalance(account, chainId, v1VaultPid))
                }
              }
              if (type === 'approveStake') {
                v3VaultPid && migrateMaximizers
                  ? dispatch(updateVaultV3UserAllowance(account, chainId, v3VaultPid))
                  : dispatch(updateFarmV2UserAllowances(chainId, v2FarmPid, account))
              }
              if (type === 'stake') {
                const log: MigrationCompleteLog = { lpSymbol: symbol, location, stakeAmount }
                dispatch(setAddCompletionLog(log))
              }
              if (type === 'unstake') {
                dispatch(updateAndMergeStatus(chainId, id, lpAddress, type, MigrateStatus.COMPLETE, 'Unstake complete'))
              } else {
                dispatch(updateMigrateStatus(id, type, MigrateStatus.COMPLETE, 'Complete'))
              }
              dispatch(setRemoveTransactions(id))
              delay(() => {
                dispatch(fetchV2Products(chainId))
                dispatch(fetchV1Products(chainId))
              }, 2000)
            } else {
              dispatch(updateMigrateStatus(id, type, MigrateStatus.INVALID, 'Something went wrong'))
              dispatch(setRemoveTransactions(id))
            }
          })
          .catch((error) => {
            console.error(`failed to check transaction hash: ${hash}`, error)
          })
      },
    )
  }, [chainId, library, account, transactions, currentBlock, migrateMaximizers, dispatch])

  return null
}
