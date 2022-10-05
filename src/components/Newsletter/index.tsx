/** @jsxImportSource theme-ui */
import React from 'react'
import useIsMobile from 'hooks/useIsMobile'
import { Text, Flex, Svg, Input, ChevronRightIcon, useMatchBreakpoints } from '@ape.swap/uikit'

const Newsletter = () => {
  const isMobile = useIsMobile()
  const { isMd } = useMatchBreakpoints()
  return (
    <Flex
      className="newsletter-con"
      sx={{
        width: '100%',
        background: 'white2',
        height: ['155px', '90px', '66px'],
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Flex
        sx={{
          width: ['88%', '90%', '90%', '90%', '100%'],
          maxWidth: '1200px',
          alignItems: 'center',
          flexDirection: ['column', 'row'],
          gap: ['12px', 0],
        }}
      >
        <Flex sx={{ flexDirection: 'column', mr: [0, 0, 0, 0, '82px'], width: ['100%', '50%', '50%', '50%', '100%'] }}>
          <Text sx={{ fontWeight: 700, fontSize: '16px', lineHeight: '24px' }}>
            Get the latest from ApeSwap {isMobile && isMd && <br />} right to your inbox.
          </Text>
          <Flex>
            <Text sx={{ fontWeight: 500, fontSize: '12px', lineHeight: '14px', fontStyle: 'italic', mr: '5px' }}>
              We respect your privacy
            </Text>
            <Svg icon="question" width="10px" />
          </Flex>
        </Flex>

        <Flex
          sx={{
            background: 'white3',
            width: ['360px', '360px', '360px', ''],
            height: '42px',
            borderRadius: '10px',
            paddingLeft: ['8px', '10px', '24px'],
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Flex sx={{ alignItems: 'center' }}>
            <Svg icon="message" />
            <Input
              placeholder="hornyape@domain.com"
              sx={{
                border: 'none',
                width: ['220px', '230px', '220px'],
                paddingRight: '5px',
                '::placeholder': {
                  opacity: 0.5,
                  fontStyle: 'italic',
                  fontSize: ['12px', '14px'],
                  lineHeight: '14px',
                },
              }}
            />
          </Flex>
          <Flex
            sx={{
              background: 'white4',
              width: '75px',
              height: '42px',
              borderRadius: '10px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ChevronRightIcon sx={{ width: '40px' }} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Newsletter
