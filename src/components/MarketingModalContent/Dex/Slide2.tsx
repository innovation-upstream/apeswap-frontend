/** @jsxImportSource theme-ui */
import React from 'react'
import { Flex, Text } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { CHAIN_PARAMS, NETWORK_LABEL } from 'config/constants/chains'
import { styles } from '../styles'

const Slide2 = () => {
  const { chainId } = useActiveWeb3React()
  const { t } = useTranslation()

  return (
    <Flex sx={styles.container}>
      <Text sx={styles.step}>{t('Step 2')}</Text>
      <Text sx={styles.head}>{t('Select Tokens & Amount')}</Text>

      <Text sx={styles.content}>
        <Text sx={styles.content}>{t('Select the tokens you want to trade and enter your preferred amount.')}</Text>
      </Text>

      <Text sx={{ ...styles.content, fontStyle: 'italic' }}>
        <Text sx={styles.content}>{t(`New to ${NETWORK_LABEL[chainId]} Chain? You might need to`)}</Text>{' '}
        <Text sx={styles.yellow}>
          <a href={'void'} target="_blank" rel="noreferrer noopener">
            {t('bridge tokens')}
          </a>
        </Text>{' '}
        <Text sx={styles.content}>
          {t(`first. Always keep spare ${CHAIN_PARAMS[chainId]['nativeCurrency']['symbol']} to account for gas fees.`)}
        </Text>
      </Text>
    </Flex>
  )
}

export default Slide2
