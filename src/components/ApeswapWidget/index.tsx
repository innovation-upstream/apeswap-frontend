import React, { useEffect } from 'react'
import { Box, Flex, Text } from 'theme-ui'
import { Button, Modal, ModalHeader, Heading, Svg, Link, IconButton, AddIcon } from '@innovationupstream/apeswap-uikit'
import useTheme from 'hooks/useTheme'

const ApeswapWidget = () => {
  const { isDark, theme } = useTheme()
  console.log('theme', theme)

  return (
    <>
      <Modal open minWidth="385px" maxWidth="100%">
        <ModalHeader>
          <Flex
            sx={{
              Svg: {
                marginLeft: 0,
                marginRight: '11px',
              },
            }}
          >
            <Svg icon="question" width="20px" />
            <Heading sx={{ fontSize: '22px', lineHeight: '33px' }} as="h4">
              Provide Liquidity
            </Heading>
          </Flex>
        </ModalHeader>
        <Flex sx={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', marginTop: '20px' }}>
          <Flex>
            <Text
              sx={{ fontSize: '16px', fontWeight: 700, lineHeight: '24px', color: isDark ? 'primaryBright' : 'brown' }}
            >
              Token 1
            </Text>
          </Flex>
          <Flex sx={{ alignItems: 'center' }}>
            <Text
              sx={{
                fontSize: '12px',
                fontWeight: 500,
                lineHeight: '14px',
                marginRight: '10px',
                color: isDark ? 'primaryBright' : 'brown',
              }}
            >
              Balance:123.456
            </Text>
            <Button
              size="sm"
              sx={{ border: 'hidden', borderRadius: '6px', padding: '3px 14px !important' }}
              variant="primary"
            >
              <Text sx={{ fontSize: '16px', fontWeight: 500, lineHeight: '24px' }}>Max</Text>
            </Button>
          </Flex>
        </Flex>
        <Flex
          sx={{ justifyContent: 'space-between', alignItems: 'center', borderRadius: '10px', padding: '10px' }}
          backgroundColor={isDark ? 'dividerColor' : 'lvl1'}
        >
          <Box
            sx={{
              Button: {
                padding: '0 !important',
              },
            }}
          >
            <Button
              csx={{
                backgroundColor: isDark ? 'dividerColor' : 'lvl1',
                border: 0,
                '&:hover': {
                  backgroundColor: isDark ? 'dividerColor' : 'lvl1',
                },
              }}
              size="sm"
              variant="primary"
            >
              <Svg icon="bnb_token" width="36px" />
              <Text
                sx={{
                  margin: '0 10px',
                  fontSize: '16px',
                  lineHeight: '24px',
                  color: isDark ? 'primaryBright' : 'brown',
                }}
              >
                BNB
              </Text>
              <Svg color={isDark ? 'primaryBright' : 'brown'} icon="caret" width="8px" />
            </Button>
          </Box>
          <Box>
            <Text
              sx={{
                fontSize: '22px',
                lineHeight: '33px',
                fontWeight: '700',
                color: isDark ? 'primaryBright' : 'brown',
              }}
            >
              100.33
            </Text>
          </Box>
        </Flex>
        <Flex sx={{ justifyContent: 'center', margin: '10px 0' }}>
          <IconButton variant="circular">
            <AddIcon width="20px" color="primaryBright" />
          </IconButton>
        </Flex>
        <Flex sx={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <Flex>
            <Text
              sx={{ fontSize: '16px', fontWeight: 700, lineHeight: '24px', color: isDark ? 'primaryBright' : 'brown' }}
            >
              Token 2
            </Text>
          </Flex>
          <Flex sx={{ alignItems: 'center' }}>
            <Text
              sx={{
                fontSize: '12px',
                fontWeight: 500,
                lineHeight: '14px',
                marginRight: '10px',
                color: isDark ? 'primaryBright' : 'brown',
              }}
            >
              Balance:123.456
            </Text>
            <Button
              size="sm"
              sx={{ border: 'hidden', borderRadius: '6px', padding: '3px 14px !important' }}
              variant="primary"
            >
              <Text sx={{ fontSize: '16px', fontWeight: 500, lineHeight: '24px' }}>Max</Text>
            </Button>
          </Flex>
        </Flex>
        <Flex
          sx={{ justifyContent: 'space-between', alignItems: 'center', borderRadius: '10px', padding: '10px' }}
          backgroundColor={isDark ? 'dividerColor' : 'lvl1'}
        >
          <Box
            sx={{
              Button: {
                padding: '0 !important',
              },
            }}
          >
            <Button
              csx={{
                backgroundColor: isDark ? 'dividerColor' : 'lvl1',
                border: 0,
                '&:hover': {
                  backgroundColor: isDark ? 'dividerColor' : 'lvl1',
                },
              }}
              size="sm"
              variant="primary"
            >
              <Svg icon="banana_token" width="36px" />
              <Text
                sx={{
                  margin: '0 10px',
                  fontSize: '16px',
                  lineHeight: '24px',
                  color: isDark ? 'primaryBright' : 'brown',
                }}
              >
                BANANA
              </Text>
              <Svg color={isDark ? 'primaryBright' : 'brown'} icon="caret" width="8px" />
            </Button>
          </Box>
          <Box>
            <Text
              sx={{
                fontSize: '22px',
                lineHeight: '33px',
                fontWeight: '700',
                color: isDark ? 'primaryBright' : 'brown',
              }}
            >
              100.33
            </Text>
          </Box>
        </Flex>
        <Box sx={{ margin: '30px 0' }}>
          <Flex
            backgroundColor={isDark ? 'dividerColor' : 'lvl1'}
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 10px',
              borderRadius: '6px 6px 0 0',
            }}
          >
            <Text
              sx={{
                fontSize: '12px',
                lineHeight: '14px',
                fontWeight: '700',
                color: isDark ? 'primaryBright' : 'brown',
              }}
            >
              BANANA per BNB
            </Text>
            <Text
              sx={{
                fontSize: '12px',
                lineHeight: '14px',
                fontWeight: '700',
                color: isDark ? 'primaryBright' : 'brown',
              }}
            >
              776.487
            </Text>
          </Flex>
          <Flex
            backgroundColor={isDark ? 'white4' : 'white2'}
            sx={{ justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px' }}
          >
            <Text
              sx={{
                fontSize: '12px',
                lineHeight: '14px',
                fontWeight: '700',
                color: isDark ? 'primaryBright' : 'brown',
              }}
            >
              Share of Pool
            </Text>
            <Text
              sx={{
                fontSize: '12px',
                lineHeight: '14px',
                fontWeight: '700',
                color: isDark ? 'primaryBright' : 'brown',
              }}
            >
              0.010%
            </Text>
          </Flex>
          <Flex
            backgroundColor={isDark ? 'dividerColor' : 'lvl1'}
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 10px',
              borderRadius: '0 0 6px 6px',
            }}
          >
            <Text
              sx={{
                fontSize: '12px',
                lineHeight: '14px',
                fontWeight: '700',
                color: isDark ? 'primaryBright' : 'brown',
              }}
            >
              BNB per BANANA
            </Text>
            <Text
              sx={{
                fontSize: '12px',
                lineHeight: '14px',
                fontWeight: '700',
                color: isDark ? 'primaryBright' : 'brown',
              }}
            >
              0.00128785
            </Text>
          </Flex>
        </Box>
        <Flex
          sx={{
            justifyContent: 'center',
            Button: {
              padding: '7px 30px',
            },
          }}
        >
          <Button size="sm" variant="primary">
            <Text sx={{ fontSize: '16px', lineHeight: '24px', fontWeight: 700 }}>CONNECT WALLET</Text>
          </Button>
        </Flex>
        <Flex sx={{ justifyContent: 'center', margin: '10px 0 0' }}>
          <Link href="/" fontFamily="poppins">
            Cancel
          </Link>
        </Flex>
      </Modal>
    </>
  )
}
export default ApeswapWidget
