import React from 'react'
import { MigrateResult } from 'state/zapMigrator/hooks'
import { Pair, TokenAmount, ZAP_ADDRESS } from '@ape.swap/sdk'
import erc20ABI from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
import BigNumber from 'bignumber.js'
import { MigrateLpStatus, MigrateStatus } from '.'

export const setMigrateLpStatus = async (
  migrateLps: MigrateResult[],
  apeswapLps: { pair: Pair; balance: TokenAmount }[],
  setLpStatus: React.Dispatch<React.SetStateAction<MigrateLpStatus[]>>,
  account,
  chainId,
) => {
  const getMigrateLpStatus = async () => {
    const calls = migrateLps?.map((migrateLp) => {
      return { address: migrateLp.lpAddress, name: 'allowance', params: [account, ZAP_ADDRESS[chainId]] }
    })
    const rawLpAllowances = await multicall(chainId, erc20ABI, calls)
    return migrateLps?.map((migrateLp, i) => {
      return {
        lpAddress: migrateLp.lpAddress,
        status: {
          unstake: parseFloat(migrateLp.stakedBalance) > 0 ? MigrateStatus.INCOMPLETE : MigrateStatus.COMPLETE,
          approveMigrate: new BigNumber(rawLpAllowances[i]).gt(0) ? MigrateStatus.COMPLETE : MigrateStatus.INCOMPLETE,
          migrate:
            parseFloat(migrateLp.walletBalance) > 0 || parseFloat(migrateLp.stakedBalance) > 0
              ? MigrateStatus.INCOMPLETE
              : MigrateStatus.COMPLETE,
          approveStake: MigrateStatus.INCOMPLETE,
          stake: MigrateStatus.INCOMPLETE,
        },
        statusText: 'Some shit',
      }
    })
  }
  const getApeswapLpStatus = async () => {
    return apeswapLps?.map(({ pair }) => {
      return {
        lpAddress: pair.liquidityToken.address,
        status: {
          unstake: MigrateStatus.COMPLETE,
          approveMigrate: MigrateStatus.COMPLETE,
          migrate: MigrateStatus.COMPLETE,
          approveStake: MigrateStatus.INCOMPLETE,
          stake: MigrateStatus.INCOMPLETE,
        },
        statusText: 'Some shit',
      }
    })
  }
  const migrateLpStatus = await getMigrateLpStatus()
  const apeswapLpStatus = await getApeswapLpStatus()
  setLpStatus([...migrateLpStatus, ...apeswapLpStatus])
}
