import { Masterchef } from 'config/abi/types'
import { Contract } from 'ethers'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import masterChefAbi from 'config/abi/masterchef.json'
import { useCallback } from 'react'
import { MigrateResult } from 'state/zapMigrator/hooks'
import { getProviderOrSigner } from 'utils'
import { unstake } from 'utils/callHelpers'
import { Status, useMigrateAll } from '../../provider'
import { useZapMigratorCallback } from 'hooks/useZapMigratorCallback'
import { useZapContract } from 'hooks/useContract'
import { JSBI, Pair, SMART_ROUTER_ADDRESS, Token, TokenAmount } from '@ape.swap/sdk'
import { useUserSlippageTolerance } from 'state/user/hooks'
import BigNumber from 'bignumber.js'
import useTransactionDeadline from 'hooks/useTransactionDeadline'
import { getFullDisplayBalance } from 'utils/formatBalance'

const useMigrateAllLps = () => {
  const { library, account, chainId } = useActiveWeb3React()
  const { handleUpdateMigrateLp } = useMigrateAll()
  const zapContract = useZapContract()
  const [allowedSlippage] = useUserSlippageTolerance(true)
  const deadline = useTransactionDeadline()
  const handleMigrateAll = useCallback(
    (migrateLps: MigrateResult[]) => {
      migrateLps.map(async (migrateLp) => {
        const { lpAddress, smartRouter, walletBalance, token0, token1, totalSupply } = migrateLp
        const poolTokenPercentage = parseFloat(walletBalance) / parseFloat(totalSupply)

        const [token0Deposited, token1Deposited] = [
          parseInt((poolTokenPercentage * token0.reserves).toString()),
          parseInt((poolTokenPercentage * token1.reserves).toString()),
        ]

        console.log([token0Deposited, token1Deposited])

        const [token0MinOut, token1MinOut] = [
          JSBI.divide(
            JSBI.multiply(JSBI.BigInt(token0Deposited), JSBI.BigInt(10000 - allowedSlippage)),
            JSBI.BigInt(10000),
          ),
          JSBI.divide(
            JSBI.multiply(JSBI.BigInt(token1Deposited), JSBI.BigInt(10000 - allowedSlippage)),
            JSBI.BigInt(10000),
          ),
        ]
        const [token0MinIn, token1MinIn] = [
          JSBI.divide(JSBI.multiply(token0MinOut, JSBI.BigInt(10000 - allowedSlippage)), JSBI.BigInt(10000)),
          JSBI.divide(JSBI.multiply(token1MinOut, JSBI.BigInt(10000 - allowedSlippage)), JSBI.BigInt(10000)),
        ]
        const tx = zapContract.zapLPMigrator(
          SMART_ROUTER_ADDRESS[chainId][smartRouter],
          lpAddress,
          new BigNumber(walletBalance).times(new BigNumber(10).pow(18)).toString(),
          token0MinOut.toString(),
          token1MinOut.toString(),
          token0MinIn.toString(),
          token1MinIn.toString(),
          deadline.toString(),
        )
        console.log(
          SMART_ROUTER_ADDRESS[chainId][smartRouter],
          lpAddress,
          new BigNumber(walletBalance).times(new BigNumber(10).pow(18)).toString(),
          token0MinOut.toString(),
          token1MinOut.toString(),
          token0MinIn.toString(),
          token1MinIn.toString(),
          deadline.toString(),
        )
        console.log(tx)
        handleUpdateMigrateLp(lpAddress, 'migrate', Status.PENDING)
        tx.then(() => {
          handleUpdateMigrateLp(lpAddress, 'migrate', Status.COMPLETE)
        }).catch(() => {
          handleUpdateMigrateLp(lpAddress, 'migrate', Status.INVALID)
        })
      })
    },
    [account, library, deadline],
  )
  return handleMigrateAll
}

export default useMigrateAllLps
