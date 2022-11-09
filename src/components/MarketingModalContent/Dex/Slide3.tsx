/** @jsxImportSource theme-ui */
import React from 'react'
import { Flex, Text, TooltipBubble } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import { styles } from '../styles'

const Slide3 = () => {
  const { t } = useTranslation()

  return (
    <Flex sx={styles.container}>
      <Text sx={styles.step}>{t('Step 3')}</Text>
      <Text sx={styles.head}>{t('Approve Router')}</Text>

      <Text sx={styles.content}>
        <Text sx={styles.content}>{t("You'll need to APPROVE the router just once.")}</Text>
      </Text>

      <Text sx={{ ...styles.content, fontStyle: 'italic' }}>
        <Text sx={styles.content}>{t('Keep in mind ApeSwap uses three different routers (')}</Text>
        <TooltipBubble
          placement={'topRight'}
          transformTip="translate(11%, 2%)"
          body={
            <Flex sx={styles.tipBody}>
              {t("ApeSwap's primary DEX router that facilitates token swaps through native liquidity sources.")}
            </Flex>
          }
          width="190px"
        >
          <Text sx={{ ...styles.content, ...styles.tipTitle }}>Ape,</Text>
        </TooltipBubble>{' '}
        <TooltipBubble
          placement={'topRight'}
          transformTip="translate(8%, 2%)"
          body={
            <Flex sx={styles.tipBody}>
              {t("ApeSwap's router that facilitates token swaps through external sources of liquidity.")}
            </Flex>
          }
          width="200px"
        >
          <Text sx={{ ...styles.content, ...styles.tipTitle }}>Smart,</Text>
        </TooltipBubble>{' '}
        <TooltipBubble
          placement={'topRight'}
          transformTip="translate(8%, 2%)"
          body={
            <Flex sx={styles.tipBody}>
              {t(
                "ApeSwap's router that finds backrunning strategies and returns a Swap Bonus when arbitrage is identified.",
              )}
            </Flex>
          }
          width="200px"
        >
          <Text sx={{ ...styles.content, ...styles.tipTitle }}>Bonus</Text>
        </TooltipBubble>
        <Text sx={styles.content}>{t(')')}</Text>
      </Text>
    </Flex>
  )
}

export default Slide3
