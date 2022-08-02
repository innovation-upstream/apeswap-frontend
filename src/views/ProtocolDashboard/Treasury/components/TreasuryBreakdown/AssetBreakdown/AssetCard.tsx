/** @jsxImportSource theme-ui */
import { Flex, Svg, Text } from '@ape.swap/uikit'
import { styles } from './styles'
import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import React, { useState } from 'react'
import CountUp from 'react-countup'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'contexts/Localization'
import { NETWORK_LABEL } from 'config/constants/chains'

const AssetCard: React.FC<{ token: any }> = ({ token }) => {
  const [expanded, setExpanded] = useState(false)
  const { t } = useTranslation()
  return (
    <Flex key={token?.address} sx={{ ...styles.assetContainer, background: expanded ? 'white4' : 'white3' }}>
      <Flex
        sx={{ justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
        onClick={() => setExpanded((prev) => !prev)}
      >
        <Flex sx={{ alignItems: 'center' }}>
          <ServiceTokenDisplay token1={token?.symbol} size={40} />
          <Text weight={700} ml="10px">
            {token?.symbol}
          </Text>
        </Flex>
        <Flex>
          <Text weight={700} mr="10px">
            $<CountUp end={token?.value} decimals={2} duration={1} separator="," />
          </Text>
          <Svg icon="caret" direction={expanded ? 'up' : 'down'} />
        </Flex>
      </Flex>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'fit-content' }}
            transition={{ opacity: { duration: 0.2 } }}
            exit={{ opacity: 0, height: 0 }}
            sx={{ position: 'relative' }}
          >
            <Flex sx={{ width: '100%', flexDirection: 'column' }}>
              <Flex
                sx={{
                  justifyContent: 'space-between',
                  margin: '10px 0px',
                }}
              >
                <Flex sx={{ width: '250px', justifyContent: 'space-between' }}>
                  <Text weight={500}>{t('Value')}:</Text>
                  <Text weight={700}>
                    $<CountUp end={token?.value} decimals={2} duration={1} separator="," />
                  </Text>
                </Flex>
                <Flex sx={{ width: '250px', justifyContent: 'space-between' }}>
                  <Text weight={500}>{t('Chain')}:</Text>
                  <Text weight={700}>{NETWORK_LABEL[token?.chainId]}</Text>
                </Flex>
              </Flex>
              <Flex sx={{ justifyContent: 'space-between' }}>
                <Flex sx={{ width: '250px', justifyContent: 'space-between' }}>
                  <Text weight={500}>{t('Location')}:</Text>
                  <Text weight={700}>{token?.location}</Text>
                </Flex>
                <Flex sx={{ width: '250px', justifyContent: 'space-between' }}>
                  <Text weight={500}>{t('Amount')}:</Text>
                  <Text weight={700}>
                    <CountUp end={token?.amount} decimals={2} duration={1} separator="," />
                  </Text>
                </Flex>
              </Flex>
              <Flex></Flex>
            </Flex>
          </motion.div>
        )}
      </AnimatePresence>
    </Flex>
  )
}

export default React.memo(AssetCard)
