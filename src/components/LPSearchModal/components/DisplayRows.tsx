/** @jsxImportSource theme-ui */
import { Token } from '@ape.swap/sdk'
import React, { useCallback } from 'react'
import { ParsedFarm } from 'state/zap/reducer'
import LpList from './LpList'

interface DisplayRowsProps {
  tokens?: { currencyA: Token; currencyB: Token }[]
  onLpSelect?: (farm: ParsedFarm) => void
}

const DisplayRows: React.FC<DisplayRowsProps> = ({ tokens, onLpSelect }) => {
  const getLPListRows = useCallback(() => {
    return <LpList tokens={tokens} onLpSelect={onLpSelect} />
  }, [onLpSelect, tokens])

  return <>{getLPListRows()}</>
}

export default React.memo(DisplayRows)
