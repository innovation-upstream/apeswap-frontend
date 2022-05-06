import React from 'react'
import { Button, useMatchBreakpoints } from '@ape.swap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useFarms } from 'state/farms/hooks'
import { Flex, Box, Text, Link } from 'theme-ui'
import styles from './styles'

const Data = () => {
  const { account } = useActiveWeb3React()
  const farmsLP = useFarms(account)
  const { isMd, isSm, isXs } = useMatchBreakpoints()
  const isMobile = isMd || isSm || isXs

  return (
    <>
      <Box sx={{ backgroundColor: 'secondaryButtonDisableBg', padding: '30px 20px', borderRadius: '10px' }}>
        <Flex
          sx={{
            marginBottom: '5px',
            fontSize: '16px',
            fontWeight: '700',
            justifyContent: 'space-between',
            paddingBottom: '5px',
          }}
        >
          <Text variant={isMobile ? 'sm' : 'md'}>APR (incl. LP rewards):</Text>
          <Text variant={isMobile ? 'sm' : 'md'}>{farmsLP[1]?.apr}%</Text>
        </Flex>
        <Flex
          sx={{
            marginBottom: '5px',
            fontSize: '16px',
            fontWeight: '700',
            justifyContent: 'space-between',
            paddingBottom: '5px',
          }}
        >
          <Text variant={isMobile ? 'sm' : 'md'}>Base APR (BANANA yield only): </Text>{' '}
          <Text variant={isMobile ? 'sm' : 'md'}>{}</Text>
        </Flex>
        <Flex
          sx={{
            marginBottom: '5px',
            fontSize: '16px',
            fontWeight: '700',
            justifyContent: 'space-between',
            paddingBottom: '5px',
          }}
        >
          <Text variant={isMobile ? 'sm' : 'md'}>APY (1x daily compound):</Text>{' '}
          <Text variant={isMobile ? 'sm' : 'md'}>{farmsLP[1]?.apy}%</Text>
        </Flex>
        <Flex
          sx={{
            marginBottom: '5px',
            fontSize: '16px',
            fontWeight: '700',
            justifyContent: 'space-between',
            paddingBottom: '5px',
          }}
        >
          <Text variant={isMobile ? 'sm' : 'md'}> Farm Multiplier:</Text>{' '}
          <Text variant={isMobile ? 'sm' : 'md'}>{farmsLP[1]?.multiplier}</Text>
        </Flex>
        <Box as="ul" sx={{ paddingBottom: '25px' }}>
          <Flex as="li">
            <Text sx={styles.text}>• Calculated based on current rates.</Text>
          </Flex>
          <Flex as="li">
            <Text sx={styles.text}>
              • LP rewards: 0.17% trading fees, distributed proportionally among LP token holders.{' '}
            </Text>
          </Flex>
          <Flex as="li">
            <Text sx={styles.text}>
              • All figures are estimates provided for your convenience only, and by no means represent guaranteed
              returns.
            </Text>
          </Flex>
        </Box>
        <Flex sx={{ justifyContent: 'center' }}>
          <Link href="add/ETH/0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95">
            <Button size={isMobile ? 'sm' : 'md'}>GET BANANA-BNB</Button>
          </Link>
        </Flex>
      </Box>
    </>
  )
}

const Details = [
  {
    open: true,
    expandedContent: <Data />,
  },
]

export default Details
