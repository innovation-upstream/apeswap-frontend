/** @jsxImportSource theme-ui */
import { Flex, Text } from '@ape.swap/uikit'
import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import { CHAIN_PARAMS, MAINNET_CHAINS } from 'config/constants/chains'
import React from 'react'
import useIsMobile from '../../../../hooks/useIsMobile'

const NetworkSelector = () => {
  const mobile = useIsMobile()
  const activeChains = JSON.parse(localStorage.getItem('infoActiveChains'))

  function toggleChain(chain) {
    let current = JSON.parse(localStorage.getItem('infoActiveChains'))
    if (current === null) current = []

    const index = current.indexOf(chain, 0)
    if (index > -1) {
      current.splice(index, 1)
    } else {
      current.push(chain)
    }

    localStorage.setItem('infoActiveChains', JSON.stringify(current))
  }

  function isActive(chain) {
    return activeChains !== null && activeChains.filter((x) => x === chain).length > 0
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
