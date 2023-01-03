/** @jsxImportSource theme-ui */
import React from 'react'
import { Flex, Link, Svg, Text } from '@ape.swap/uikit'
import { styles } from './styles'
import { useTranslation } from 'contexts/Localization'

const ButtonsRow: React.FC<{ projectLink: string; twitter: string }> = ({ projectLink, twitter }) => {
  const { t } = useTranslation()

  return (
    <Flex>
      <Flex sx={styles.iconButton}>
        <Link href={projectLink} target="_blank">
          <Svg icon="URL" width={18} />
        </Link>
      </Flex>
      <Flex sx={styles.iconButton}>
        <Link href={twitter} target="_blank">
          <Svg icon="twitter" width={18} color="text" />
        </Link>
      </Flex>
      <Flex sx={styles.iconButton}>
        <Svg icon="bubble" width={18} color="text" />
      </Flex>
      <Flex sx={{ ...styles.iconButton, '& svg': { marginRight: '5px' } }}>
        <Svg icon="audit" width={18} color="text" />
        <Text sx={{ marginRight: '5px' }}>{t('Audit')}</Text>
      </Flex>
    </Flex>
  )
}

export default ButtonsRow
