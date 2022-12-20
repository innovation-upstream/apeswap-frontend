/** @jsxImportSource theme-ui */
import { Flex, Input, Text } from '@ape.swap/uikit'
import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import { CHAIN_PARAMS, MAINNET_CHAINS } from 'config/constants/chains'
import React from 'react'
import useIsMobile from '../../../../hooks/useIsMobile'
import { useFetchActiveChains } from '../../../../state/info/hooks'

interface NetworkSelectorProps {
  onFilter: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const NetworkSelector: React.FC<NetworkSelectorProps> = (props) => {
  const mobile = useIsMobile()
  const [activeChains, toggleChain] = useFetchActiveChains()
  const { onFilter } = props

  function isActive(chain) {
    // If active changes equals null it means all chains should be shown
    return activeChains === null || activeChains.filter((x) => x === chain).length > 0
  }

  return (
    <>
      <Flex
        sx={{
          width: `${mobile ? '95vw' : '100%'}`,
          maxWidth: '1200px',
          height: 'fit-content',
          padding: '20px',
          background: 'white2',
          borderRadius: '10px',
          mb: '20px',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        <Flex sx={{ flex: `${mobile ? '0 0 100%' : '1'}`, marginTop: `${mobile ? '15px' : '0px'}` }}>
          <Text bold mr="15px" mt="5px" ml="20px">
            Search
          </Text>
          <Input icon="search" sx={{ width: '100%', marginLeft: '10px' }} width="100%" onChange={onFilter} />
        </Flex>
        <Flex
          sx={{
            flex: `${mobile ? '0 0 100%' : ''}`,
            justifyContent: `${mobile ? 'center' : 'flex-end'}`,
            order: `${mobile ? '-1' : '1'}`,
          }}
        >
          {MAINNET_CHAINS.map((chainId) => {
            return (
              <div
                onClick={() => toggleChain(chainId)}
                key={chainId}
                sx={{
                  background: 'white3',
                  borderRadius: '10px',
                  padding: '10px',
                  cursor: 'pointer',
                  margin: '0px 0px 0px 10px',
                }}
              >
                <Flex sx={{ opacity: `${isActive(chainId) === true ? '100%' : '40%'}` }}>
                  <ServiceTokenDisplay token1={CHAIN_PARAMS[chainId].nativeCurrency.symbol} size={30} />
                </Flex>
              </div>
            )
          })}
        </Flex>
      </Flex>
    </>
  )
}

export default NetworkSelector
