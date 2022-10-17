/** @jsxImportSource theme-ui */
import React from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import BigNumber from 'bignumber.js'
import { CenterContainer } from './styles'
import ApprovalAction from './ApprovalAction'
import StakeAction from './StakeActions'
import UnlockButton from '../../../../components/UnlockButton'
import { DualFarm } from '../../../../state/types'
import { ModalProvider } from '@ape.swap/uikit'

// Changed props to type string because BigNumbers cause re-renders

interface CardActionProps {
  lpValueUsd: number
  farm: DualFarm
}

const CardActions: React.FC<CardActionProps> = ({ lpValueUsd, farm }) => {
  const { account } = useActiveWeb3React()

  return (
    <>
      {!account ? (
        <CenterContainer>
          <UnlockButton table />
        </CenterContainer>
      ) : (
        <StakeAction lpValueUsd={lpValueUsd} farm={farm} />
      )}
    </>
  )
}

export default React.memo(CardActions)
