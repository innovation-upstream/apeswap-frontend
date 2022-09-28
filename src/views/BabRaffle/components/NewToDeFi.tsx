/** @jsxImportSource theme-ui */
import React from 'react'

import { Flex, Text, Button } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import { styles } from '../styles'

const NewToDeFi: React.FC = () => {
  const { t } = useTranslation()
  const openLink = (link: string) => window.open(link, '_blank')
  return (
    <Flex
      sx={{
        background: 'white2',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: ['50px', '100px'],
        gap: [0, '15px'],
      }}
    >
      <Flex
        sx={{
          width: ['90%'],
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          marginTop: ['20px', '30px'],
        }}
      >
        <Text sx={{ fontSize: '30px', lineHeight: '45px', fontWeight: 700 }}>{t('New to DeFi?')}</Text>
        <Text sx={{ fontSize: '22px', lineHeight: '33px', fontWeight: 700 }}>
          {t('ApeSwap is the best place to start!')}
        </Text>
        <Text sx={{ fontSize: '22px', lineHeight: '33px', fontWeight: 400 }}>
          {t('Exchange, Stake, Lend, and Raise, all in one place.')}
        </Text>
      </Flex>
      <Flex sx={styles.btnContainer}>
        <Button
          variant="secondary"
          onClick={() => openLink('https://apeswap.finance/?modal=tutorial')}
          sx={{ ...styles.btn, margin: ['25px 0 0 0', 0] }}
        >
          {t('Learn More')}
        </Button>
        <Button onClick={() => openLink('https://welcome.apeswap.finance')} sx={styles.btn}>
          {t('Get Started')}
        </Button>
      </Flex>
    </Flex>
  )
}

export default React.memo(NewToDeFi)
