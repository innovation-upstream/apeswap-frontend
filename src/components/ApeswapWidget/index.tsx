import React from 'react'
import { Box, Flex } from 'theme-ui'
import {
  Button,
  Text,
  Modal,
  ModalHeader,
  Heading,
  Svg,
  Link,
  IconButton,
  AddIcon,
} from '@innovationupstream/apeswap-uikit'
import useTheme from 'hooks/useTheme'

const ApeswapWidget = () => {
  const { isDark } = useTheme()

  return (
    <>
      <Modal colorMode={isDark ? 'dark' : 'light'} open minWidth="20%">
        <ModalHeader>
          <Svg  icon="question" width="20px" />
          <Heading as="h4">Provide Liquidity</Heading>
        </ModalHeader>
        <Flex>
            <Text>Token 1</Text>
           <Text>Balance:123.456</Text>
          <Button  size="sm" variant="primary">
            <Text weight="normal">Max</Text>
          </Button>
           </Flex>
        <Flex sx={{justifyContent:'space-between'}} backgroundColor={isDark ? 'dividerColor' : 'lvl1'}>
          <Box >
            <Button csx={{
                backgroundColor:'dividerColor',
                border: 0,
              }} size="sm" variant="primary">
              <Svg  icon="bnb_token" width="20px" />
              <Text weight="normal">BNB</Text>
              <Svg color="primaryBright" icon="caret" width="13px" />
            </Button>
          </Box>
          <Box>
            <Text weight="normal">100.33</Text>
          </Box>
        </Flex>
        <IconButton variant="circular">
          <AddIcon />
        </IconButton>
        <Flex >
          <Text>Token 2</Text>
          <Text>Balance:123.456</Text>
          <Button size="sm" variant="primary">
            <Text weight="normal">Max</Text>
          </Button>
        </Flex>
        <Flex sx={{justifyContent:'space-between'}} backgroundColor={isDark ? 'dividerColor' : 'lvl1'}>
          <Box>
            <Button
              size="sm"
              variant="primary"
              csx={{
                backgroundColor:'dividerColor',
                border: 0,
              }}
            >
              <Svg color="backgroundDisabled" icon="banana_token" width="20px" />
              <Text weight="normal">Banana</Text>
              <Svg  color="primaryBright" icon="caret" width="13px" />
            </Button>
          </Box>
          <Box>
            <Text weight="normal">100.33</Text>
          </Box>
        </Flex>
        <Box>
          <Box backgroundColor={isDark ? 'dividerColor' : 'lvl1'}>
            <Text weight="normal">BANANA per BNB</Text>
            <Text weight="normal">776.487</Text>
          </Box>
          <Box  backgroundColor={isDark ? 'white4' : 'white2'}>
            <Text weight="normal">Share of Pool</Text>
            <Text weight="normal">0.010%</Text>
          </Box>
          <Box backgroundColor={isDark ? 'dividerColor' : 'lvl1'}>
            <Text weight="normal">BNB per BANANA</Text>
            <Text weight="normal">0.00128785</Text>
          </Box>
        </Box>
        <Box sx={{}}>
        <Button  size="sm" variant="primary">
          <Text weight="normal">CONNECT WALLET</Text>
        </Button>
        </Box>
        <Link href="/" fontFamily="poppins">
          Cancel
        </Link>
      </Modal>
    </>
  )
}
export default ApeswapWidget
