/** @jsxImportSource theme-ui */
import React from 'react'
import { Flex, Text } from '@ape.swap/uikit'
import ServiceTokenDisplay from '../../ServiceTokenDisplay'
import Balance from '../Balance'
import { ParsedFarm } from 'state/zap/reducer'

interface LPRowProps {
  farm?: ParsedFarm
  onLpSelect?: (farm: ParsedFarm) => void
}

const LpRow: React.FC<LPRowProps> = ({ farm, onLpSelect }) => {
  return (
    <>
      <Flex
        sx={{
          justifyContent: 'space-between',
          padding: '5px',
          ':hover': { background: 'white4', cursor: 'pointer' },
        }}
        onClick={() => onLpSelect(farm)}
      >
        <Flex sx={{ alignItems: 'center' }}>
          <ServiceTokenDisplay token1={farm.currency1Symbol} token2={farm.currency2Symbol} noEarnToken={true} />
          <Flex sx={{ flexDirection: 'column', ml: '10px', alignItems: 'space-between' }}>
            <Flex sx={{ alignItems: 'center' }}>
              <Text title={farm.lpSymbol} weight={700} sx={{ lineHeight: '22px' }}>
                {farm.lpSymbol}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Balance balance={farm?.userData?.tokenBalance} />
      </Flex>
    </>
  )
}

export default React.memo(LpRow)
