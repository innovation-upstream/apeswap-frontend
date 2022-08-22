/** @jsxImportSource theme-ui */
import { Flex, Svg, Text, useModal } from '@ape.swap/uikit'
import React from 'react'
import { styles } from '../styles'
import LPSearchModal from '../../LPSearchModal/LPSearchModal'
import ServiceTokenDisplay from '../../ServiceTokenDisplay'
import { ParsedFarm } from 'state/zap/reducer'

const LPSelector: React.FC<{
  selectedFarm: ParsedFarm
  onLpSelect: (farm: ParsedFarm) => void
  field: any
  typedValue?: string
}> = ({ selectedFarm, onLpSelect }) => {
  const [onPresentCurrencyModal] = useModal(<LPSearchModal onLpSelect={onLpSelect} selectedFarm={selectedFarm} />)

  return (
    <Flex sx={{ ...styles.primaryFlex }} onClick={onPresentCurrencyModal}>
      <ServiceTokenDisplay
        token1={selectedFarm.currency1Symbol}
        token2={selectedFarm.currency2Symbol}
        noEarnToken
        size={30}
      />
      <Text sx={styles.tokenText}>{selectedFarm?.lpSymbol}</Text>
      <Svg icon="caret" />
    </Flex>
  )
}

export default React.memo(LPSelector)
