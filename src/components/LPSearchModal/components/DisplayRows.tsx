/** @jsxImportSource theme-ui */
import React, { useCallback, useRef } from 'react'
import { ParsedFarm } from 'state/zap/reducer'
import { FixedSizeList } from 'react-window'
import { Currency, ETHER, Token } from '@ape.swap/sdk'
import LpList from './LpList'

interface DisplayRowsProps {
  queriedFarms?: ParsedFarm[]
  onLpSelect?: (farm: ParsedFarm) => void
}

const DisplayRows: React.FC<DisplayRowsProps> = ({ queriedFarms, onLpSelect }) => {
  const getLPListRows = useCallback(() => {
    return <LpList lps={queriedFarms} onLpSelect={onLpSelect} />
  }, [onLpSelect, queriedFarms])

  return <>{getLPListRows()}</>
}

export default React.memo(DisplayRows)
