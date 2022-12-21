/** @jsxImportSource theme-ui */
import React from 'react'
import { Modal, Flex, Text, IconButton } from '@ape.swap/uikit'
import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import { CHAIN_PARAMS, MAINNET_CHAINS, NETWORK_INFO_LINK } from 'config/constants/chains'
import useIsMobile from '../../../../hooks/useIsMobile'

interface LegacySelectModalProps {
  onDismiss: () => void
}

const LegacySelectModal: React.FC<LegacySelectModalProps> = ({ onDismiss }) => {
  const mobile = useIsMobile()

  return (
    <Modal onDismiss={onDismiss} minWidth={`${mobile ? '95vw' : '500px'}`} maxWidth={`${mobile ? '95vw' : '500px'}`}>
      <Flex alignItems="center" justifyContent="center" mt="10px" mb="20px">
        <IconButton
          icon="close"
          color="text"
          variant="transparent"
          onClick={onDismiss}
          sx={{ position: 'absolute', right: '20px', top: '25px' }}
        />
      </Flex>
      <Flex sx={{ width: '100%', alignItems: 'center', justifyContent: 'center', mb: '20px' }}>
        <Text size="14px" sx={{ textAlign: 'center' }}>
          {`Select a logo below to view that chain's previous analytics page`}{' '}
        </Text>
      </Flex>
      <Flex sx={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        {MAINNET_CHAINS.map((chainId) => {
          return (
            <a
              href={NETWORK_INFO_LINK[chainId]}
              target="_blank"
              rel="noopener noreferrer"
              key={chainId}
              sx={{ cursor: 'pointer', margin: '0px 20px' }}
            >
              <Flex>
                <ServiceTokenDisplay token1={CHAIN_PARAMS[chainId].nativeCurrency.symbol} />
              </Flex>
            </a>
          )
        })}
      </Flex>
    </Modal>
  )
}

export default React.memo(LegacySelectModal)
