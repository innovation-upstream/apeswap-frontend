/** @jsxImportSource theme-ui */
import React from 'react'
import { Flex, Text, TooltipBubble, useMatchBreakpoints } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import { styles } from '../styles'

const Slide5 = () => {
  const { isLg, isXl, isXxl } = useMatchBreakpoints()
  const isMobile = !isLg && !isXl && !isXxl
  const { t } = useTranslation()

  return (
    <Flex sx={styles.container}>
      <Text sx={styles.step}>{t('Step 5')}</Text>
      <Text sx={styles.head}>{t('Claim!')}</Text>

      <Text sx={styles.content}>
        <Text sx={styles.content}>
          {t(
            'The tokens will vest linearly until the end of the vesting period. You can CLAIM as you earn, or all at once after fully vested.',
          )}
        </Text>
        <br />
        <Text sx={styles.content}>{t('You can also')}</Text>{' '}
        <TooltipBubble
          placement={isMobile ? 'topLeft' : 'topRight'}
          transformTip={`translate(${isMobile ? '-3%' : '0'}, 2%)`}
          body={
            <Flex sx={styles.tipBody}>
              {t('Transferring a Treasury Bill NFT will also transfer any unclaimed tokens to the new holder.')}
            </Flex>
          }
          sx={{ width: ['210px', '210px', '350px'] }}
        >
          <Text sx={{ ...styles.content, ...styles.tipTitle }}>TRANSFER</Text>
        </TooltipBubble>{' '}
        <Text sx={styles.content}>{t('your Bill NFTs to other wallets!')}</Text>
      </Text>
    </Flex>
  )
}

export default Slide5
