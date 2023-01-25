/** @jsxImportSource theme-ui */
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useHarvest } from 'hooks/useHarvest'
import { AutoRenewIcon, Button, Flex } from '@ape.swap/uikit'
import { useToast } from 'state/hooks'
import { useIsModalShown } from 'state/user/hooks'
import { getEtherscanLink, showCircular } from 'utils'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { updateFarmUserEarnings } from 'state/farms'
import { useAppDispatch } from 'state'
import { useTranslation } from 'contexts/Localization'
import { styles } from '../styles'
import ListViewContent from 'components/ListViewV2/ListViewContent'

interface HarvestActionsProps {
  pid: number
  userEarningsUsd: string
  disabled: boolean
}

const HarvestAction: React.FC<HarvestActionsProps> = ({ pid, disabled, userEarningsUsd }) => {
  const { account, chainId } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const [pendingTrx, setPendingTrx] = useState(false)
  const { onHarvest } = useHarvest(pid)
  const { toastSuccess } = useToast()
  const { t } = useTranslation()
  const history = useHistory()

  const { showGeneralHarvestModal } = useIsModalShown()
  const displayGHCircular = () => showGeneralHarvestModal && showCircular(chainId, history, '?modal=circular-gh')

  return (
    <Flex
      sx={{
        width: ['100%', '100%', 'unset'],
        minWidth: '205px',
        justifyContent: 'space-between',
        mt: ['10px', '10px', '0px'],
      }}
    >
      <Flex sx={styles.onlyMobile}>
        <ListViewContent
          title={t('Earned')}
          value={userEarningsUsd}
          style={{ maxWidth: '50%', flexDirection: 'column' }}
        />
      </Flex>
      <Flex sx={{ width: '50%', maxWidth: '130px' }}>
        <Button
          className="noClick"
          disabled={disabled || pendingTrx}
          onClick={async () => {
            setPendingTrx(true)
            await onHarvest()
              .then((resp) => {
                const trxHash = resp.transactionHash
                toastSuccess(t('Harvest Successful'), {
                  text: t('View Transaction'),
                  url: getEtherscanLink(trxHash, 'transaction', chainId),
                })
                if (trxHash) displayGHCircular()
              })
              .catch((e) => {
                console.error(e)
                setPendingTrx(false)
              })
            dispatch(updateFarmUserEarnings(chainId, pid, account))
            setPendingTrx(false)
          }}
          endIcon={pendingTrx && <AutoRenewIcon spin color="currentColor" />}
          sx={styles.styledBtn}
        >
          {t('HARVEST')}
        </Button>
      </Flex>
      <Flex sx={styles.onlyDesktop}>
        <ListViewContent
          title={t('Earned')}
          value={userEarningsUsd}
          style={{ flexDirection: 'column', maxWidth: '110px' }}
        />
      </Flex>
    </Flex>
  )
}

export default React.memo(HarvestAction)
