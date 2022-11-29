/** @jsxImportSource theme-ui */
import { Flex, Text } from '@ape.swap/uikit'
import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import { CHAIN_PARAMS, MAINNET_CHAINS } from 'config/constants/chains'
import React from 'react'
import useIsMobile from '../../../../hooks/useIsMobile'

const NetworkSelector = () => {
  const mobile = useIsMobile()
  let activeChains = JSON.parse(localStorage.getItem('infoActiveChains'))

  function toggleChain(chain) {
    let current = JSON.parse(localStorage.getItem('infoActiveChains'))

    // If activeChains is null it means all are selected, so when they select one they are actually deselecting it.
    // Add all and then let it be removed below
    if (current === null) {
      current = []
      for (let i = 0; i < MAINNET_CHAINS.length; i++) {
        if (MAINNET_CHAINS[i] !== chain) {
          current.push(MAINNET_CHAINS[i])
        }
      }
    } else {
      const index = current.indexOf(chain, 0)
      if (index > -1) {
        current.splice(index, 1)
        //If this makes active Chains = 0 then add all
        if (current.length === 0) current = MAINNET_CHAINS
      } else {
        current.push(chain)
      }
    }

    localStorage.setItem('infoActiveChains', JSON.stringify(current))
    activeChains = current
  }

  function isActive(chain) {
    // If active changes equals null it means all chains should be shown
    return activeChains === null || activeChains.filter((x) => x === chain).length > 0
  }

  return (
    <>
      <Flex sx={{ flexDirection: 'column', width: `${mobile ? '95vw' : '100%'}`, mb: '20px' }}>
        <Text size="18px" weight={700}>
          Network Filters
        </Text>
      </Flex>
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
          flexDirection: 'column',
        }}
      >
        <Flex>
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
                  margin: '0px 20px',
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
