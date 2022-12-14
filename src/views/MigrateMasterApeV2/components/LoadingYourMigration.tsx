/** @jsxImportSource theme-ui */
import React from 'react'
import Lottie from 'lottie-react'
import typingMonkey from 'config/constants/lottie/typing-monkey.json'
import { Flex, Text } from '@ape.swap/uikit'
import Dots from 'components/Loader/Dots'
import useIsMobile from 'hooks/useIsMobile'

const LoadingYourMigration: React.FC = () => {
  const isMobile = useIsMobile()
  return (
    <Flex
      sx={{
        width: '100%',
        borderRadius: '10px',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
      }}
    >
      <Text size={isMobile ? '12px' : '16px'} weight={700}>
        Loading Your Custom Migration Experience <Dots />
      </Text>
      <Flex sx={{ width: isMobile ? '200px' : '250px' }}>
        <Lottie animationData={typingMonkey} loop />
      </Flex>
    </Flex>
  )
}

export default LoadingYourMigration
