import React from 'react'
import { Flex, Heading } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'

interface ComingSoonProps {
  children?: React.ReactNode
}

const ComingSoon: React.FC<ComingSoonProps> = ({ children }) => {
  const TranslateString = useI18n()

  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center" p="24px">
      <Heading as="h5" size="md" color="textDisabled">
        {children || TranslateString(999, 'Coming Soon!')}
      </Heading>
    </Flex>
  )
}

export default ComingSoon