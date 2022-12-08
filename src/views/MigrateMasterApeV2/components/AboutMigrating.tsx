/** @jsxImportSource theme-ui */
import { Flex, Svg, Text } from '@ape.swap/uikit'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'

export const AboutMigrating = () => {
  const [expanded, setExpanded] = useState(false)
  return (
    <Flex
      sx={{
        width: '100%',
        height: 'fit-content',
        minHeight: '100px',
        background: 'white2',
        borderRadius: '10px',
        padding: '0px 20px',
        margin: '20px 0px',
        cursor: 'pointer',
        flexDirection: 'column',
      }}
      onClick={() => setExpanded((prev) => !prev)}
    >
      <Flex sx={{ alignItems: 'center', justifyContent: 'space-between', height: '100px', width: '100%' }}>
        <Text size="20px">ABOUT MIGRATION</Text>
        <Svg icon="caret" direction={expanded ? 'up' : 'down'} />
      </Flex>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'fit-content' }}
            transition={{ opacity: { duration: 0.2 } }}
            exit={{ height: 0 }}
            sx={{ position: 'relative', width: '100%', overflow: 'hidden' }}
          >
            <Flex
              sx={{
                flexDirection: 'row',
                height: '100px',
                width: '100%',
                padding: '0px 30px 0px 30px',
                flexWrap: 'no-wrap',
                alignItems: 'center',
              }}
            >
              <Text>Some description of the migration here</Text>
            </Flex>
          </motion.div>
        )}
      </AnimatePresence>
    </Flex>
  )
}
