/** @jsxImportSource theme-ui */
import React from 'react'
import { Flex } from '@ape.swap/uikit'
import CTACard from './CTACard'
import { CTAProps } from './types'

const CTA_CARDS = {
  selling: {
    0: <CTACard type="maximizers" />,
    1: <CTACard type="pools" />,
    2: <CTACard type="lending" />,
  },
  buying: {
    0: <CTACard type="maximizers" />,
    1: <CTACard type="pools" />,
    2: <CTACard type="gnana" />,
  },
  generalHarvest: {
    0: <CTACard type="compound" />,
    1: <CTACard type="pools" />,
    2: <CTACard type="gnana" />,
  },
  poolHarvest: {
    0: <CTACard type="compound" />,
    1: <CTACard type="maximizers" />,
    2: <CTACard type="gnana" />,
  },
}

const CTA: React.FC<CTAProps> = ({ actionType }) => {
  const cards = CTA_CARDS[actionType]
  const cardsLength = Object.keys(cards).length
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        marginTop: ['20px', '30px'],
      }}
    >
      {/* Display each collection of CTACards using the modal actionType */}
      {[...Array(cardsLength)].map((_, idx) => cards[idx])}
    </Flex>
  )
}

export default CTA
