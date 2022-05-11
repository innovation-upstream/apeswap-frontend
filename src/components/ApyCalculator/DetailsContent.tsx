import React, { useState } from 'react'
import { Flex, Text, Box, Link } from 'theme-ui'
import { Button } from '@ape.swap/uikit'
import { DropDownIcon } from 'components/ListView/styles'
import useIsMobile from 'hooks/useIsMobile'
import styles from './styles'

interface expandCardProps {
  [key: string]: any
}

const DetailsContent: React.FC<expandCardProps> = ({ ...props }) => {
  const [expanded, setExpanded] = useState(true)
  const isMobile = useIsMobile()

  return (
    <>
      <Flex sx={{ justifyContent: 'center', alignItems: 'center', columnGap: '10px', marginBottom: '15px' }}>
        <Text sx={{ fontWeight: 700 }}>Details</Text>
        <DropDownIcon onClick={() => setExpanded((prev) => !prev)} open={expanded} />
      </Flex>
      <Box sx={styles.detailContainer(!expanded)}>
        <Flex sx={styles.detailRow}>
          <Text>APR (incl. LP rewards)</Text>
          <Text>{props?.aprRewards}%</Text>
        </Flex>
        <Flex sx={styles.detailRow}>
          <Text>Base APR (BANANA yield only)</Text> <Text>{props?.apr}%</Text>
        </Flex>
        <Flex sx={styles.detailRow}>
          <Text>APY (1x daily compound)</Text> <Text>{props?.detailApy}%</Text>
        </Flex>
        <Flex sx={styles.detailRow}>
          <Text> Farm Multiplier</Text>
          <Text>{props?.multiplier}</Text>
        </Flex>

        <ul>
          <li>
            <Text sx={styles?.text}>Calculated based on current rates.</Text>
          </li>
          <li>
            <Text sx={styles?.text}>
              LP rewards: 0.17% trading fees, distributed proportionally among LP token holders.{' '}
            </Text>
          </li>
          <li>
            <Text sx={styles?.text}>
              All figures are estimates provided for your convenience only, and by no means represent guaranteed
              returns.
            </Text>
          </li>
        </ul>

        <Flex sx={{ marginTop: '25px', justifyContent: 'center' }}>
          <Link href={props?.addLiquidityUrl}>
            <Button size={isMobile ? 'sm' : 'md'}>GET {props?.lpLabel}</Button>
          </Link>
        </Flex>
      </Box>
    </>
  )
}
export default DetailsContent
