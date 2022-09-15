/** @jsxImportSource theme-ui */
import React, { useMemo } from 'react'
import { Flex, Svg, Text, useModal } from '@ape.swap/uikit'
import { styles } from '../styles'
import LPSearchModal from 'components/LPSearchModal/LPSearchModal'
import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import { ParsedFarm } from 'state/zap/reducer'
import { Spinner } from 'theme-ui'
import { Pair } from '@ape.swap/sdk'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import getCleanLpSymbol from 'utils/getCleanLpSymbol'

const LPSelector: React.FC<{
  lpPair: Pair
  onLpSelect: (farm: ParsedFarm) => void
}> = ({ lpPair, onLpSelect }) => {
  const [onPresentCurrencyModal] = useModal(<LPSearchModal onLpSelect={onLpSelect} />)
  const { chainId } = useActiveWeb3React()

  return (
    <Flex sx={{ ...styles.primaryFlex }} onClick={onPresentCurrencyModal}>
      {lpPair ? (
        <>
          <ServiceTokenDisplay
            token1={lpPair?.token1?.getSymbol(chainId)}
            token2={lpPair?.token0?.getSymbol(chainId)}
            noEarnToken
            size={30}
          />
          <Text sx={styles.tokenText}>{getCleanLpSymbol(lpPair, chainId)}</Text>
        </>
      ) : (
        <Spinner width="15px" height="15px" sx={{ marginRight: '10px' }} />
      )}
      <Svg icon="caret" />
    </Flex>
  )
}

export default React.memo(LPSelector)
