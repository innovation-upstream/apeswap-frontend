import React, { useCallback } from 'react'
import LPRow from './LPRow'
import { ParsedFarm } from 'state/zap/reducer'

interface DisplayRowsProps {
  queriedFarms?: ParsedFarm[]
  onLpSelect?: (farm: ParsedFarm) => void
}

const DisplayRows: React.FC<DisplayRowsProps> = ({ queriedFarms, onLpSelect }) => {
  const getLPListRows = useCallback(() => {
    return (
      <div>
        {queriedFarms?.map((farm) => {
          return <LPRow key={farm.lpAddress} farm={farm} onLpSelect={onLpSelect} />
        })}
      </div>
    )
  }, [onLpSelect, queriedFarms])

  return <>{getLPListRows()}</>
}

export default React.memo(DisplayRows)
