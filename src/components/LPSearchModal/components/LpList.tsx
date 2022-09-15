/** @jsxImportSource theme-ui */
import React, { useCallback } from 'react'
import { ParsedFarm } from 'state/zap/reducer'
import styled from 'styled-components'
import { FixedSizeList } from 'react-window'
import LpRow from './LPRow'
import { Token } from '@ape.swap/sdk'

interface LpListProps {
  tokens: { currencyA: Token; currencyB: Token }[]
  onLpSelect?: (farm: ParsedFarm) => void
}

const CustomFixedList = styled(FixedSizeList)`
  border-radius: 10px 0px 0px 10px;
`

const LpList: React.FC<LpListProps> = ({ tokens, onLpSelect }) => {
  const Row = useCallback(
    ({ data, index, style }) => {
      const tokens: { currencyA: Token; currencyB: Token } = data[index]
      const handleSelect = () => onLpSelect(null)
      return <LpRow style={style} tokens={tokens} onLpSelect={handleSelect} />
    },
    [onLpSelect],
  )

  return (
    <CustomFixedList height={300} width="100%" itemData={tokens} itemCount={tokens.length} itemSize={45}>
      {Row}
    </CustomFixedList>
  )
}

export default React.memo(LpList)
