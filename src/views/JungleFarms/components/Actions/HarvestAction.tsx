/** @jsxImportSource theme-ui */
import React, { useState } from 'react'
import { useJungleHarvest } from 'hooks/useHarvest'
import { useToast } from 'state/hooks'
import { getEtherscanLink } from 'utils'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { updateJungleFarmsUserPendingReward } from 'state/jungleFarms'
import { useTranslation } from 'contexts/Localization'
import { useAppDispatch } from 'state'
import { Button, Flex } from '@ape.swap/uikit'
import ListViewContent from 'components/ListViewV2/ListViewContent'
import { styles } from '../styles'

interface HarvestActionsProps {
  jungleId: number
  userEarnings: number
  earnTokenSymbol: string
  disabled: boolean
  userEarningsUsd: string
}

const HarvestAction: React.FC<HarvestActionsProps> = ({
  jungleId,
  earnTokenSymbol,
  disabled,
  userEarnings,
  userEarningsUsd,
}) => {
  const { account, chainId } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const [pendingTrx, setPendingTrx] = useState(false)
  const { onHarvest } = useJungleHarvest(jungleId)

  const { toastSuccess } = useToast()
  const { t } = useTranslation()

  const handleHarvest = async () => {
    setPendingTrx(true)
    await onHarvest()
      .then((resp) => {
        const trxHash = resp.transactionHash
        toastSuccess(t('Harvest Successful'), {
          text: t('View Transaction'),
          url: getEtherscanLink(trxHash, 'transaction', chainId),
        })
      })
      .catch((e) => {
        console.error(e)
        setPendingTrx(false)
      })
    dispatch(updateJungleFarmsUserPendingReward(chainId, jungleId, account))
    setPendingTrx(false)
  }

  return (
    <Flex sx={styles.harvestAction}>
      <Flex sx={{ ...styles.onlyMobile, width: '100%' }}>
        <ListViewContent
          title={`${t('Earned')} ${earnTokenSymbol}`}
          value={userEarnings?.toFixed(4)}
          value2={userEarningsUsd}
          value2Secondary
          value2Direction="column"
          style={{ maxWidth: '50%', flexDirection: 'column' }}
        />
      </Flex>
      <Flex sx={{ width: '100%', maxWidth: '130px' }}>
        <Button disabled={disabled || pendingTrx} onClick={handleHarvest} load={pendingTrx} sx={styles.styledBtn}>
          {t('HARVEST')}
        </Button>
      </Flex>
      <Flex sx={styles.onlyDesktop}>
        <ListViewContent
          title={`${t('Earned')} ${earnTokenSymbol}`}
          value={userEarnings?.toFixed(4)}
          value2={userEarningsUsd}
          value2Secondary
          value2Direction="column"
          style={{ flexDirection: 'column', maxWidth: '110px' }}
        />
      </Flex>
    </Flex>
  )
}

export default React.memo(HarvestAction)
