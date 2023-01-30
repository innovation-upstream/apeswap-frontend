/** @jsxImportSource theme-ui */
import React, { useState } from 'react'
import { useToast } from 'state/hooks'
import { getEtherscanLink, showCircular } from 'utils'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { fetchVaultUserDataAsync } from 'state/vaults'
import useHarvestMaximizer from 'views/Vaults/hooks/useHarvestMaximizer'
import { useAppDispatch } from 'state'
import { useIsModalShown } from 'state/user/hooks'
import { useHistory } from 'react-router-dom'
import { AutoRenewIcon, Button, Flex } from '@ape.swap/uikit'
import ListViewContent from '../../../../components/ListViewV2/ListViewContent'
import { useTranslation } from 'contexts/Localization'
import { styles } from '../styles'

interface HarvestActionsProps {
  pid: number
  userEarnings: number
  earnTokenSymbol: string
  disabled: boolean
}

const HarvestAction: React.FC<HarvestActionsProps> = ({ pid, earnTokenSymbol, disabled, userEarnings }) => {
  const { account, chainId } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const [pendingTrx, setPendingTrx] = useState(false)
  const { onHarvest } = useHarvestMaximizer(pid)
  const { toastSuccess } = useToast()
  const history = useHistory()
  const { t } = useTranslation()

  const { showGeneralHarvestModal } = useIsModalShown()
  const displayGHCircular = () => showGeneralHarvestModal && showCircular(chainId, history, '?modal=circular-gh')

  const handleHarvest = async () => {
    setPendingTrx(true)
    await onHarvest()
      .then((resp) => {
        const trxHash = resp.transactionHash
        toastSuccess('Harvest Successful', {
          text: 'View Transaction',
          url: getEtherscanLink(trxHash, 'transaction', chainId),
        })
        if (trxHash) displayGHCircular()
      })
      .catch((e) => {
        console.error(e)
        setPendingTrx(false)
      })
    dispatch(fetchVaultUserDataAsync(account, chainId))
    setPendingTrx(false)
  }

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
          title={`Earned ${earnTokenSymbol}`}
          value={userEarnings?.toFixed(4)}
          style={{ maxWidth: '50%', flexDirection: 'column' }}
        />
      </Flex>
      <Flex sx={{ width: '100%', maxWidth: '130px' }}>
        <Button
          disabled={disabled || pendingTrx}
          onClick={handleHarvest}
          load={pendingTrx}
          endIcon={pendingTrx && <AutoRenewIcon spin color="currentColor" />}
          sx={styles.styledBtn}
        >
          {t('HARVEST')}
        </Button>
      </Flex>
      <Flex sx={styles.onlyDesktop}>
        <ListViewContent
          title={`Earned ${earnTokenSymbol}`}
          value={userEarnings?.toFixed(4)}
          style={{ flexDirection: 'column', maxWidth: '110px', justifyContent: 'flex-start' }}
        />
      </Flex>
    </Flex>
  )
}

export default React.memo(HarvestAction)
