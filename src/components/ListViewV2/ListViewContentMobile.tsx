/** @jsxImportSource theme-ui */
import React from 'react'
import { Flex, HelpIcon, ListTag, ListTagVariants, Skeleton, Text } from '@ape.swap/uikit'
import { TooltipBubble } from '@ape.swap/uikit'
import { ValueSkeleton } from '../ListViewContent/styles'
import { useTranslation } from '../../contexts/Localization'
import { styles } from './styles'

interface ListViewContentMobileProps {
  tag?: ListTagVariants
  title?: string
  value: string
  valueColor?: string
  toolTip?: string
  toolTipPlacement?: 'topLeft' | 'topRight' | 'bottomRight' | 'bottomLeft'
  toolTipTransform?: string
  value2?: string
  value2Secondary?: boolean
  aprCalculator?: React.ReactNode
  style?: any
  value2Direction?: 'column' | 'row'
}

const ListViewContentMobile: React.FC<ListViewContentMobileProps> = ({
  tag,
  title,
  value,
  valueColor,
  toolTip,
  toolTipPlacement,
  toolTipTransform,
  value2,
  value2Secondary,
  style,
  value2Direction = 'row',
  aprCalculator,
}) => {
  const { t } = useTranslation()
  return (
    <Flex style={{ ...styles.listViewContainer, ...style }}>
      <>
        {toolTip ? (
          <Flex sx={{ alignItems: 'center' }}>
            <TooltipBubble
              placement={toolTipPlacement}
              transformTip={toolTipTransform}
              body={<Flex>{t(`${toolTip}`)}</Flex>}
              width="180px"
            >
              <Text sx={styles.titleText}>
                {t(`${title}`)}
                <HelpIcon width="12px" ml="5px" />
              </Text>
            </TooltipBubble>
            {aprCalculator}
          </Flex>
        ) : (
          <Flex sx={{ alignItems: 'center' }}>
            {tag ? <ListTag variant={tag} {...{ sx: { mr: '5px' } }} /> : <Text sx={styles.titleText}>{title}</Text>}
            {aprCalculator}
          </Flex>
        )}
      </>
      <Flex sx={{ flexDirection: value2Direction }}>
        <Text sx={{ ...styles.valueText, color: valueColor, mr: '5px' }}>
          {value.includes('NaN') || value.includes('undefined') || value.includes('null') ? (
            <ValueSkeleton sx={styles.skeleton} />
          ) : (
            value
          )}
        </Text>
        {value2 && (
          <Text sx={value2Secondary ? styles.secondaryText : styles.valueText}>
            {value2.includes('NaN') || value2.includes('undefined') || value.includes('null') ? (
              <Skeleton sx={styles.skeleton} />
            ) : (
              value2
            )}
          </Text>
        )}
      </Flex>
    </Flex>
  )
}

export default React.memo(ListViewContentMobile)
