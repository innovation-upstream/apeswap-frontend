/** @jsxImportSource theme-ui */
import { Flex, Svg, Text, useModal } from '@ape.swap/uikit'
import React, { useMemo } from 'react'
import { styles } from '../styles'
import LPSearchModal from '../../LPSearchModal/LPSearchModal'
import ServiceTokenDisplay from '../../ServiceTokenDisplay'
import { ParsedFarm } from 'state/zap/reducer'
import { getZapOutputList, useSetInitialZapData } from '../../../state/zap/hooks'
import { useJungleFarms, usePollJungleFarms, useSetJungleFarms } from '../../../state/jungleFarms/hooks'
import useActiveWeb3React from '../../../hooks/useActiveWeb3React'
import { useFarms } from '../../../state/farms/hooks'
import { useBlock } from '../../../state/block/hooks'

const LPSelector: React.FC<{
  selectedFarm: ParsedFarm
  onLpSelect: (farm: ParsedFarm) => void
  field: any
  typedValue?: string
}> = ({ selectedFarm, onLpSelect }) => {
  useSetInitialZapData()
  useSetJungleFarms()
  usePollJungleFarms()
  const { account, chainId } = useActiveWeb3React()
  const farms = useFarms(account)
  const jungleFarms = useJungleFarms(account)
  const { currentBlock } = useBlock()

  const zapOutputList = useMemo(
    () => getZapOutputList(farms, jungleFarms, currentBlock, chainId),
    [chainId, currentBlock, farms, jungleFarms],
  )

  const [onPresentCurrencyModal] = useModal(
    <LPSearchModal onLpSelect={onLpSelect} selectedFarm={selectedFarm} zapOutputList={zapOutputList} />,
  )

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
