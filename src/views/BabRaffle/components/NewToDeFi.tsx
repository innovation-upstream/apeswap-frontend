/** @jsxImportSource theme-ui */
import React from 'react'

import { Flex, Text, Button } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import { styles } from '../styles'

const NewToDeFi: React.FC = () => {
  const { t } = useTranslation()
  const openLink = (link: string) => window.open(link, '_blank')
  return (
    <Flex sx={styles.ntd}>
      <Flex sx={styles.ntdTop}>
        <Text sx={styles.ntdHeader}>{t('New to DeFi?')}</Text>
        <Text sx={styles.ntdSupportHeader}>{t('ApeSwap is the best place to start!')}</Text>
        <Text sx={styles.ntdDescription}>{t('Exchange, Stake, Lend, and Raise, all in one place.')}</Text>
      </Flex>
      <Flex sx={styles.btnContainer}>
        <Button
          variant="secondary"
          onClick={() => openLink('https://welcome.apeswap.finance')}
          sx={{ ...styles.btn, margin: ['25px 0 0 0', 0] }}
        >
          {t('Learn More')}
        </Button>
        <Button onClick={() => openLink('https://apeswap.finance/?modal=tutorial')} sx={styles.btn}>
          {t('Get Started')}
        </Button>
      </Flex>
    </Flex>
  )
}

export default React.memo(NewToDeFi)
