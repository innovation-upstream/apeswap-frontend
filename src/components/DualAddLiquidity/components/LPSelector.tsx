/** @jsxImportSource theme-ui */
import React from 'react'
import { Flex, Svg, Text, useModal } from '@ape.swap/uikit'
import { styles } from '../styles'
import LPSearchModal from '../../LPSearchModal/LPSearchModal'
import ServiceTokenDisplay from '../../ServiceTokenDisplay'
import { ParsedFarm } from 'state/zap/reducer'
import { Field } from 'state/zap/actions'
import { Spinner } from 'theme-ui'

const LPSelector: React.FC<{
  selectedFarm: ParsedFarm
  onLpSelect: (farm: ParsedFarm) => void
  field: Field
  typedValue?: string
}> = ({ selectedFarm, onLpSelect }) => {
  const [onPresentCurrencyModal] = useModal(<LPSearchModal onLpSelect={onLpSelect} />)

  return (
    <Flex sx={{ ...styles.primaryFlex }} onClick={onPresentCurrencyModal}>
      {selectedFarm.currency1Symbol || selectedFarm.currency2Symbol ? (
        <ServiceTokenDisplay
          token1={selectedFarm.currency1Symbol}
          token2={selectedFarm.currency2Symbol}
          noEarnToken
          size={30}
        />
      ) : (
        <Spinner width="15px" height="15px" />
      )}
      <Text sx={styles.tokenText}>{selectedFarm?.lpSymbol}</Text>
      <Svg icon="caret" />
    </Flex>
  )
}

export default React.memo(LPSelector)
