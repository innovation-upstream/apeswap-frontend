import React, { useContext } from 'react'
import ReactDOM from 'react-dom'
import { Svg, Button, Text, Modal, ModalHeader, Heading } from '@innovationupstream/apeswap-uikit'
import useSwitchNetwork from 'hooks/useSelectNetwork'
import { CHAIN_ID } from 'config/constants/chains'
import { useNetworkChainId } from 'state/hooks'
import { SSRContext } from 'contexts/SSRContext'

const networks = [
  {
    icon: 'bsc_token',
    name: 'BNB',
    chain: CHAIN_ID.BSC,
  },
  {
    icon: 'polygon_token',
    name: 'POLYGON',
    chain: CHAIN_ID.MATIC,
  },
]

interface Props {
  open: boolean
  handleClose?: () => void
}

const NetworkModal: React.FC<Props> = ({ open, handleClose }) => {
  const chainId = useNetworkChainId()
  const { switchNetwork } = useSwitchNetwork()
  const { isBrowser } = useContext(SSRContext)
  const modalContainer = isBrowser ? document.querySelector('#network-modal-root') : null

  const handleChange = (chain: number) => {
    switchNetwork(chain)
    handleClose()
  }

  return modalContainer
    ? ReactDOM.createPortal(
        <Modal handleClose={handleClose} maxWidth="350px" minWidth="350px" open={open}>
          <ModalHeader handleClose={handleClose}>
            <Heading as="h4">Select a Network</Heading>
          </ModalHeader>
          {networks.map((data) => (
            <Button
              csx={{
                width: '100%',
                height: '48px',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '10px 0',
              }}
              size="sm"
              variant={chainId === data.chain ? 'primary' : 'secondary'}
              onClick={() => handleChange(data.chain)}
              disabled={chainId === data.chain}
            >
              <Svg color="yellow" direction="down" icon={data.icon as any} width={22} />
              <Text color="info" variant="md" weight="normal" sx={{ margin: '0 10px' }}>
                {data.name}
              </Text>
            </Button>
          ))}
        </Modal>,
        modalContainer,
      )
    : null
}

export default NetworkModal
