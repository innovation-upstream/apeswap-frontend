import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { getEtherscanLink } from 'utils'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useBlockNumber from 'lib/hooks/useBlockNumber'
import { useToast } from 'state/hooks'
import { useAppDispatch } from '../index'
import { State } from 'state/types'
import { ProductTypes } from './types'
import { setRemoveTransactions } from './reducer'
import { updateFarmV2UserAllowances, updateFarmV2UserTokenBalances } from 'state/farmsV2'
import { updateFarmUserStakedBalances, updateFarmUserTokenBalances } from 'state/farms'
import { updateVaultUserBalance, updateVaultUserStakedBalance } from 'state/vaults'
import { updateVaultV3UserAllowance } from 'state/vaultsV3'

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

  const { toastError, toastSuccess } = useToast()

  const migrateMaximizers = useSelector((state: State) => state.masterApeMigration.migrateMaximizers)

  useEffect(() => {
    if (!chainId || !library || !currentBlock) return

    transactions.forEach(({ hash, migrateLpType, id, v2FarmPid, v1FarmPid, v1VaultPid, v3VaultPid, type }) => {
      library
        .getTransactionReceipt(hash)
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
              dispatch(updateFarmV2UserTokenBalances(chainId, v2FarmPid, account))
            }
            dispatch(setRemoveTransactions(id))
            // finalizeTransaction({
            //   chainId,
            //   hash,
            //   receipt: {
            //     blockHash: receipt.blockHash,
            //     blockNumber: receipt.blockNumber,
            //     contractAddress: receipt.contractAddress,
            //     from: receipt.from,
            //     status: receipt.status,
            //     to: receipt.to,
            //     transactionHash: receipt.transactionHash,
            //     transactionIndex: receipt.transactionIndex,
            //   },
            // }),

            // eslint-disable-next-line no-unused-expressions
            receipt.status === 1
              ? toastSuccess('Transaction Successful', {
                  text: 'View Transaction',
                  url: getEtherscanLink(receipt.transactionHash, 'transaction', chainId),
                })
              : toastError('Transaction Failed')
          } else {
            dispatch(setRemoveTransactions(id))
            // dispatch(checkedTransaction({ chainId, hash, blockNumber: currentBlock }))
          }
        })
        .catch((error) => {
          console.error(`failed to check transaction hash: ${hash}`, error)
        })
    })
  }, [chainId, library, transactions, currentBlock, migrateMaximizers, dispatch, toastSuccess, toastError])

  return null
}
