import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCallback } from 'react'
import { MigrateResult } from 'state/zapMigrator/hooks'
import { MigrateStatus } from '../provider/types'
import { useZapContract } from 'hooks/useContract'
import { JSBI, SMART_ROUTER_ADDRESS } from '@ape.swap/sdk'
import { useUserSlippageTolerance } from 'state/user/hooks'
import BigNumber from 'bignumber.js'
import useTransactionDeadline from 'hooks/useTransactionDeadline'
import { calculateGasMargin } from 'utils'
import { useMigrateAll } from '../provider'

const useMigrateAllLps = () => {
  const { library, chainId } = useActiveWeb3React()
  const { handleUpdateMigrateLp, handleUpdateOfApeswapLpBalance, handleUpdateMigratorResults } = useMigrateAll()
  const zapContract = useZapContract()
  const [allowedSlippage] = useUserSlippageTolerance(true)
  const deadline = useTransactionDeadline()
  const handleMigrateAll = useCallback(
    (migrateLps: MigrateResult[]) => {
      migrateLps.map(async (migrateLp) => {
        try {
          const { lpAddress, smartRouter, walletBalance, token0, token1, totalSupply, id } = migrateLp
          const poolTokenPercentage = parseFloat(walletBalance) / parseFloat(totalSupply)

          const [token0Deposited, token1Deposited] = [
            parseInt((poolTokenPercentage * token0.reserves).toString()),
            parseInt((poolTokenPercentage * token1.reserves).toString()),
          ]
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
          handleUpdateMigrateLp(id, 'migrate', MigrateStatus.PENDING, 'Migrate in progress')
          const gasEstimate = await zapContract.estimateGas.zapLPMigrator(
            SMART_ROUTER_ADDRESS[chainId][smartRouter],
            lpAddress,
            new BigNumber(walletBalance).times(new BigNumber(10).pow(18)).toString(),
            token0MinOut.toString(),
            token1MinOut.toString(),
            token0MinIn.toString(),
            token1MinIn.toString(),
            deadline.toString(),
          )

          zapContract
            .zapLPMigrator(
              SMART_ROUTER_ADDRESS[chainId][smartRouter],
              lpAddress,
              new BigNumber(walletBalance).times(new BigNumber(10).pow(18)).toString(),
              token0MinOut.toString(),
              token1MinOut.toString(),
              token0MinIn.toString(),
              token1MinIn.toString(),
              deadline.toString(),
              { gasLimit: calculateGasMargin(gasEstimate) },
            )
            .then((tx) =>
              library
                .waitForTransaction(tx.hash)
                .then(() => {
                  handleUpdateMigrateLp(id, 'migrate', MigrateStatus.COMPLETE, 'Migrate complete')
                  handleUpdateOfApeswapLpBalance(id, token0.address, token1.address)
                  handleUpdateMigratorResults()
                })
                .catch((e) => {
                  console.error(e)
                  handleUpdateMigrateLp(id, 'migrate', MigrateStatus.INVALID, e.message)
                }),
            )
            .catch((e) => {
              handleUpdateMigrateLp(id, 'migrate', MigrateStatus.INVALID, e.message)
            })
        } catch {
          handleUpdateMigrateLp(
            migrateLp.id,
            'migrate',
            MigrateStatus.INVALID,
            'Something went wrong please try refreshing',
          )
        }
      })
    },
    [
      library,
      deadline,
      allowedSlippage,
      zapContract,
      chainId,
      handleUpdateMigrateLp,
      handleUpdateOfApeswapLpBalance,
      handleUpdateMigratorResults,
    ],
  )
  return handleMigrateAll
}

export default useMigrateAllLps
