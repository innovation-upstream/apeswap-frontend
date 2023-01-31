/** @jsxImportSource theme-ui */
import React, { useState } from 'react'
import { Flex } from '@ape.swap/uikit'
import { AnimatePresence, motion } from 'framer-motion'
import { styles } from './styles'
import { ListCardProps } from './types'
import InfoContent from './components/InfoContent'

const ListCard: React.FC<ListCardProps> = ({
  serviceTokenDisplay,
  title,
  cardContent,
  expandedContent,
  infoContent,
  open,
}) => {
  const [expanded, setExpanded] = useState(open)
  return (
    <>
      <Flex sx={styles.listCardContainer} onClick={() => setExpanded((prev) => !prev)}>
        <Flex sx={styles.titleContainer}>
          <Flex sx={styles.tokensContainer}>
            {serviceTokenDisplay}
            <Flex sx={{ flexDirection: 'column', marginLeft: '10px' }}>{title}</Flex>
          </Flex>
          <Flex sx={styles.infoContentMobile}>
            <InfoContent infoContent={infoContent} expandedContent={expandedContent} expanded={expanded} />
          </Flex>
        </Flex>
        {cardContent && <Flex sx={styles.cardContentContainer}>{cardContent}</Flex>}
        <Flex
          sx={{
            display: ['none', 'none', 'flex'],
            minWidth: expandedContent ? '49px' : '20px',
            justifyContent: 'center',
          }}
        >
          <InfoContent infoContent={infoContent} expandedContent={expandedContent} expanded={expanded} />
        </Flex>
      </Flex>
      <AnimatePresence>
        {expandedContent && expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'fit-content' }}
            transition={{ delay: 0.2 }}
            exit={{ opacity: 0 }}
            sx={styles.animationDiv}
          >
            <Flex sx={styles.expandedWrapper}>{expandedContent}</Flex>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default React.memo(ListCard)
