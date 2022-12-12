import { Masterchef, VaultApeV1, VaultApeV2 } from 'config/abi/types'
import { Contract } from 'ethers'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import masterChefAbi from 'config/abi/masterchef.json'
import vaultApeV1Abi from 'config/abi/vaultApeV1.json'
import vaultApeV2Abi from 'config/abi/vaultApeV2.json'
import { useCallback } from 'react'
import { MigrateResult } from 'state/zapMigrator/hooks'
import { getProviderOrSigner } from 'utils'
import { unstake, vaultUnstakeAll, vaultUnstakeV1, vaultUnstakeV2 } from 'utils/callHelpers'
import { MasterApeProductsInterface, MigrateStatus, ProductTypes } from '../provider/types'
import { useMigrateAll } from '../provider'
import track from 'utils/track'
import { useMasterChefAddress, useVaultApeAddressV1, useVaultApeAddressV2 } from 'hooks/useAddress'
import { useVaultApeV2 } from 'hooks/useContract'
import { useAppDispatch } from 'state'
import { updateFarmUserStakedBalances, updateFarmUserTokenBalances } from 'state/farms'
import { updateVaultUserBalance, updateVaultUserStakedBalance } from 'state/vaults'
import farmsV2, { updateFarmV2UserTokenBalances } from 'state/farmsV2'
import { useFarmsV2 } from 'state/farmsV2/hooks'
import { useHandleUpdateAndMergeMigrateUnstake } from '../provider/hooks'
import { updateVaultsV3UserData, updateVaultV3UserBalance } from 'state/vaultsV3'
import { useVaultsV3 } from 'state/vaultsV3/hooks'

const useUnstakeAll = () => {
  const { library, account, chainId } = useActiveWeb3React()
  const { handleUpdateMigrateLp, handleUpdateAndMergeMigrateUnstake } = useMigrateAll()
  const masterChefV1Address = useMasterChefAddress()
  const vaultV2Address = useVaultApeAddressV2()
  const vaultV1Address = useVaultApeAddressV1()
  const v2Farms = useFarmsV2(null)
  const dispatch = useAppDispatch()

  const handleUnstakeAll = useCallback(
    (migrateLps: MasterApeProductsInterface[]) => {
      migrateLps.map(async (migrateLp) => {
        // Get the corresponding farm pid
        // TODO: Remove the or 0 pid after farmaway is removed
        const v2FarmPid =
          v2Farms.find(({ lpAddresses }) => migrateLp.lp === lpAddresses[chainId].toLowerCase())?.pid || 0
        try {
          const { pid, stakedAmount, id, type, lp } = migrateLp
          // Define contracts in the callback to avoid a new contract being initalized every render
          const masterApeV1Contract = new Contract(
            masterChefV1Address,
            masterChefAbi,
            getProviderOrSigner(library, account),
          ) as Masterchef
          const vaultV1Contract = new Contract(
            vaultV1Address,
            vaultApeV1Abi,
            getProviderOrSigner(library, account),
          ) as VaultApeV1
          const vaultV2Contract = new Contract(
            vaultV2Address,
            vaultApeV2Abi,
            getProviderOrSigner(library, account),
          ) as VaultApeV2

          handleUpdateMigrateLp(id, 'unstake', MigrateStatus.PENDING, 'Unstake in progress')

          const contractCall =
            type === ProductTypes.FARM
              ? unstake(masterApeV1Contract, pid, stakedAmount)
              : vaultUnstakeAll(type === ProductTypes.VAULT_V1 ? vaultV1Contract : vaultV2Contract, pid)
          contractCall
            .then((tx) =>
              library
                .waitForTransaction(tx.transactionHash)
                .then(() => {
                  if (type === ProductTypes.FARM) {
                    dispatch(updateFarmV2UserTokenBalances(chainId, v2FarmPid, account))
                    dispatch(updateFarmUserStakedBalances(chainId, pid, account))
                    dispatch(updateFarmUserTokenBalances(chainId, pid, account))
                  } else {
                    dispatch(updateFarmV2UserTokenBalances(chainId, v2FarmPid, account))
                    dispatch(updateVaultUserStakedBalance(account, chainId, pid))
                    dispatch(updateVaultUserBalance(account, chainId, pid))
                  }
                  handleUpdateAndMergeMigrateUnstake(id, lp, 'unstake', MigrateStatus.COMPLETE, 'Unstake complete')
                  // track({
                  //   event: 'migrate_unstake',
                  //   chain: chainId,
                  //   data: {
                  //     cat: smartRouter,
                  //     token1: token0.symbol,
                  //     token2: token1.symbol,
                  //     amount: stakedBalance,
                  //   },
                  // })
                })
                .catch((e) => handleUpdateMigrateLp(id, 'unstake', MigrateStatus.INVALID, e.message)),
            )
            .catch((e) => {
              handleUpdateMigrateLp(id, 'unstake', MigrateStatus.INVALID, e.message)
            })
        } catch {
          handleUpdateMigrateLp(
            migrateLp.id,
            'unstake',
            MigrateStatus.INVALID,
            'Something went wrong please try refreshing',
          )
        }
      })
    },
    [
      account,
      handleUpdateMigrateLp,
      handleUpdateAndMergeMigrateUnstake,
      dispatch,
      masterChefV1Address,
      vaultV2Address,
      vaultV1Address,
      library,
      chainId,
      v2Farms,
    ],
  )
  return handleUnstakeAll
}

export default useUnstakeAll
