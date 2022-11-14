/** @jsxImportSource theme-ui */
import React from 'react'
import { Flex, Text, TooltipBubble } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import { styles } from '../styles'

const Slide2 = () => {
  const { t } = useTranslation()

  return (
    <Flex sx={styles.container}>
      <Text sx={styles.step}>{t('Step 2')}</Text>
      <Text sx={styles.head}>{t('Get Tokens!')}</Text>
      <Text sx={styles.content}>
        <Text sx={styles.content}>{t('Select GET BANANA or GET GNANA to acquire tokens to stake.')}</Text>
      </Text>
      <Text sx={{ ...styles.content, fontStyle: 'italic' }}>
        <Text sx={styles.content}>{t('If you want to stake')}</Text>{' '}
        <TooltipBubble
          placement={'topRight'}
          transformTip={`translate(3%, 2%)`}
          body={
            <Flex sx={styles.tipBody}>
              {t("ApeSwap's governance token that also enables access to exclusive pools and IAO allocations")}
            </Flex>
          }
          sx={{ width: ['210px', '210px', '350px'] }}
        >
          <Text sx={{ ...styles.content, ...styles.tipTitle }}>GNANA,</Text>
        </TooltipBubble>{' '}
        <Text sx={styles.content}> {t("you'll need to get BANANA First!")}</Text>
      </Text>
    </Flex>
  )
}

export default Slide2
