import React from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { CenterContainer } from './styles'
import StakeAction from './StakeActions'
import UnlockButton from 'components/UnlockButton'
import { JungleFarm } from 'state/types'

interface ActionProps {
  farm: JungleFarm
}

const Actions: React.FC<ActionProps> = ({ farm }) => {
  const { account } = useActiveWeb3React()
  const actionToRender = () => {
    if (!account) {
      return (
        <CenterContainer>
          <UnlockButton table />
        </CenterContainer>
      )
    }
    return <StakeAction farm={farm} />
  }
  return actionToRender()
}

export default React.memo(Actions)
