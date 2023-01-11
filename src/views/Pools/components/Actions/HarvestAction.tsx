/** @jsxImportSource theme-ui */
import React, { useState } from 'react'
import { Button, Flex } from '@ape.swap/uikit'
import { useHistory } from 'react-router-dom'
import { useSousHarvest } from 'hooks/useHarvest'
import useIsMobile from 'hooks/useIsMobile'
import { useToast } from 'state/hooks'
import { getEtherscanLink, showCircular } from 'utils'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useSousStake } from 'hooks/useStake'
import { fetchPoolsUserDataAsync, updateUserPendingReward } from 'state/pools'
import { useCurrency } from 'hooks/Tokens'
import { useBananaAddress } from 'hooks/useAddress'
import { useIsModalShown } from 'state/user/hooks'

import { useTranslation } from 'contexts/Localization'
import { useAppDispatch } from 'state'
import { poolStyles } from '../styles'
import ListViewContentMobile from 'components/ListViewV2/ListViewContentMobile'

interface HarvestActionsProps {
  sousId: number
  userEarnings: number
  earnTokenSymbol: string
  earnTokenValueUsd: number
  disabled: boolean
}

const HarvestAction: React.FC<HarvestActionsProps> = ({
  sousId,
  earnTokenSymbol,
  disabled,
  userEarnings,
  earnTokenValueUsd,
}) => {
  const { account, chainId } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const [pendingTrx, setPendingTrx] = useState(false)
  const [pendingApeHarderTrx, setPendingApeHarderTrx] = useState(false)
  const { onHarvest } = useSousHarvest(sousId)
  const { onStake } = useSousStake(sousId, earnTokenValueUsd)
  const bananaToken = useCurrency(useBananaAddress())
  const { showPoolHarvestModal } = useIsModalShown()
  const history = useHistory()

  const { toastSuccess } = useToast()
  const isMobile = useIsMobile()
  const { t } = useTranslation()

  const harvestBanana = earnTokenSymbol === bananaToken.symbol
  const displayPHCircular = () =>
    showPoolHarvestModal && harvestBanana && showCircular(chainId, history, '?modal=circular-ph')

  const userTokenBalanceUsd = (userEarnings * earnTokenValueUsd).toFixed(2)

  const handleHarvest = async () => {
    setPendingTrx(true)
    await onHarvest()
      .then((resp) => {
        const trxHash = resp.transactionHash
        toastSuccess(t('Harvest Successful'), {
          text: t('View Transaction'),
          url: getEtherscanLink(trxHash, 'transaction', chainId),
        })
        if (trxHash) displayPHCircular()
      })
      .catch((e) => {
        console.error(e)
        setPendingTrx(false)
      })
    dispatch(updateUserPendingReward(chainId, sousId, account))
    setPendingTrx(false)
  }

  const handleApeHarder = async () => {
    setPendingApeHarderTrx(true)
    await onStake(userEarnings.toString())
      .then((resp) => {
        const trxHash = resp.transactionHash
        toastSuccess(t('Ape Harder Successful'), {
          text: t('View Transaction'),
          url: getEtherscanLink(trxHash, 'transaction', chainId),
        })
      })
      .catch((e) => {
        console.error(e)
        setPendingApeHarderTrx(false)
      })
    dispatch(fetchPoolsUserDataAsync(chainId, account))
    setPendingApeHarderTrx(false)
  }

  return (
    <Flex sx={poolStyles.harvestContainer}>
      <Flex sx={{ width: isMobile && '100%', justifyContent: 'space-between' }}>
        {isMobile && (
          <ListViewContentMobile
            title={`${t('Earned')} ${earnTokenSymbol}`}
            value={userEarnings?.toFixed(4)}
            value2={`$${userTokenBalanceUsd}`}
            value2Secondary
            value2Direction="column"
            style={{ flexDirection: 'column' }}
          />
        )}
        <Button disabled={disabled || pendingTrx} onClick={handleHarvest} load={pendingTrx} sx={poolStyles.styledBtn}>
          {t('HARVEST')}
        </Button>
      </Flex>
      {sousId === 0 && (
        <Flex sx={{ width: isMobile && '100%', margin: isMobile ? '15px 0 0 0' : '0 10px' }}>
          <Button
            disabled={disabled || pendingApeHarderTrx}
            onClick={handleApeHarder}
            load={pendingApeHarderTrx}
            sx={poolStyles.apeHarder}
          >
            {t('APE HARDER')}
          </Button>
        </Flex>
      )}
      {!isMobile && (
        <ListViewContentMobile
          title={`${t('Earned')} ${earnTokenSymbol}`}
          value={userEarnings?.toFixed(3)}
          style={{
            flexDirection: 'column',
            maxWidth: '95px',
            marginLeft: '10px',
            justifyContent: 'flex-start',
            height: '48px',
          }}
        />
      )}
    </Flex>
  )
}

export default React.memo(HarvestAction)
