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
        mt: isMobile ? '0px' : '20px',
      }}
    >
      <Text size={isMobile ? '14px' : '25px'} weight={700}>
        Loading Your Custom Migration Experience <Dots />
      </Text>
      <Flex sx={{ width: isMobile ? '290px' : '350px' }}>
        <Lottie animationData={typingMonkey} loop />
      </Flex>
    </Flex>
  )
}

export default LoadingYourMigration
