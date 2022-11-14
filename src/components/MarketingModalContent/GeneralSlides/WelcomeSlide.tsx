/** @jsxImportSource theme-ui */
import React from 'react'
import { Flex, Text, useWalletModal } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { NETWORK_LABEL } from 'config/constants/chains'
import { METAMASK_LINKS } from 'config/constants'
import useAuth from 'hooks/useAuth'
import { styles } from '../styles'

const WelcomeSlide = () => {
  const { login, logout } = useAuth()
  const { chainId } = useActiveWeb3React()
  const { t } = useTranslation()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)

  return (
    <Flex sx={styles.container}>
      <Text sx={styles.step}>{t('Step 1')}</Text>
      <Text sx={styles.head}>{t('Connect your wallet')}</Text>

      <Text sx={styles.content}>
        <Text sx={styles.yellow} onClick={onPresentConnectModal}>
          {t('Click here')}
        </Text>{' '}
        <Text sx={styles.content}>{t('to connect your wallet to ApeSwap.')}</Text>
      </Text>

      <Text sx={{ ...styles.content, fontStyle: 'italic' }}>
        <Text sx={styles.content}>{t('Don’t have a wallet?')}</Text>{' '}
        <Text sx={styles.content}>
          {t(`A full setup guide for MetaMask on ${NETWORK_LABEL[chainId]} Chain can be found `)}
        </Text>
        <Text sx={styles.yellow}>
          <a href={METAMASK_LINKS[NETWORK_LABEL[chainId]]} target="_blank" rel="noreferrer noopener">
            {t('here')}
          </a>
        </Text>
      </Text>
    </Flex>
  )
}

export default WelcomeSlide
