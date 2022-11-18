/** @jsxImportSource theme-ui */
import { Flex, TooltipBubble, InfoIcon, Svg } from '@ape.swap/uikit'
import React, { useState } from 'react'
import { ContentContainer, DropDownIcon, ListCardContainer, ListExpandedContainer, styles } from './styles'
import { ListCardProps } from './types'

const MobileListCard: React.FC<ListCardProps> = ({
  serviceTokenDisplay,
  tag,
  title,
  cardContent,
  expandedContent,
  infoContent,
  infoContentPosition,
  open,
  expandedContentSize,
  toolTipIconWidth,
  toolTipStyle,
  ttWidth,
  backgroundColor,
  beforeTokenContent,
}) => {
  const [expanded, setExpanded] = useState(open)
  return (
    <>
      <ListCardContainer onClick={() => setExpanded((prev) => !prev)} backgroundColor={backgroundColor}>
        <Flex sx={{ width: '100%', justifyContent: 'space-between' }}>
          {beforeTokenContent && <Flex>{beforeTokenContent}</Flex>}
          <Flex sx={styles.titleContainer}>
            {serviceTokenDisplay}
            <Flex sx={{ flexDirection: 'column', marginLeft: '10px' }}>
              {tag}
              {title}
            </Flex>
          </Flex>
          <Flex sx={{ alignItems: 'baseline' }}>
            {infoContent && (
              <div style={{ display: 'inline-block', ...toolTipStyle }}>
                <TooltipBubble
                  body={infoContent}
                  transformTip={infoContentPosition || 'translate(0%, 0%)'}
                  width={ttWidth || '200px'}
                >
                  <InfoIcon width={'18px'} />
                </TooltipBubble>
              </div>
            )}
            {expandedContent && (
              <span style={{ marginLeft: '10px', transform: 'translate(0, -5px)' }}>
                <Svg icon="caret" direction={expanded ? 'up' : 'down'} width="10px" />
              </span>
            )}
          </Flex>
        </Flex>
        {cardContent && <ContentContainer>{cardContent}</ContentContainer>}
      </ListCardContainer>
      {expandedContent && expanded && (
        <ListExpandedContainer size={expandedContentSize}>{expandedContent}</ListExpandedContainer>
      )}
    </>
  )
}

export default React.memo(MobileListCard)
