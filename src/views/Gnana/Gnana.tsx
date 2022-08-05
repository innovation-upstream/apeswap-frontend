/** @jsxImportSource theme-ui */
import React, { useCallback, useState, useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { Box } from 'theme-ui'
import { Flex, Heading, Button, Text, ChevronRightIcon, Svg } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import { gnanaStyles } from './styles'
import { useCurrency } from 'hooks/Tokens'
import { Field } from 'state/swap/actions'
import { getFullDisplayBalance } from 'utils/formatBalance'
import useTokenBalance from 'hooks/useTokenBalance'
import { useBananaAddress } from 'hooks/useAddress'
import InputPanel from './components/InputPanel'

const Gnana = () => {
  const MAX_BUY = 500
  const { t } = useTranslation()
  const [tradeValueUsd, setTradeValueUsd] = useState(0)
  const [unlimited, setUnlimited] = useState(false)
  const [val, setVal] = useState('0')
  const [processing, setProcessing] = useState(false)
  const bananaBalance = useTokenBalance(useBananaAddress())

  // 0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95 - BANANA
  // 0xdDb3Bd8645775F59496c821E4F55A7eA6A6dc299 - GNANA
  const bananaToken = useCurrency('0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95')
  const gnanaToken = useCurrency('0xdDb3Bd8645775F59496c821E4F55A7eA6A6dc299')

  // MAIN GNANA THINGS
  const fullBalance = useMemo(() => {
    return Number(getFullDisplayBalance(bananaBalance)).toFixed(4)
  }, [bananaBalance])
  console.log('fullBalance', fullBalance)

  const handleSelectMax = useCallback(() => {
    const max = parseInt(fullBalance) < MAX_BUY || unlimited ? fullBalance : MAX_BUY
    setVal(max.toString())
  }, [fullBalance, unlimited, setVal])

  const handleChange = useCallback(
    (val) => {
      if (!unlimited && parseInt(val) > MAX_BUY) return
      setVal(val)
    },
    [setVal, unlimited],
  )

  const disabled = processing || parseInt(val) === 0 || parseInt(val) > parseInt(fullBalance)

  return (
    <Flex
      sx={{
        flexDirection: 'column',
      }}
    >
      <Flex
        sx={{
          width: '100%',
          alignItems: 'center',
          backgroundColor: 'yellow',
          padding: '10px',
          borderRadius: '10px',
          marginTop: '10px',
          opacity: 0.7,
        }}
      >
        <Flex sx={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <Heading as="h1" sx={{ ...gnanaStyles.warningHeader, color: 'primaryBright' }}>
            {t('HEADS UP, APES!')}
          </Heading>

          <Box
            sx={{
              padding: '0px',
              fontSize: ['14px'],
            }}
          >
            <Text
              align="center"
              sx={{
                fontSize: ['12px'],
                letterSpacing: '5%',
                fontWeight: 500,
                color: 'primaryBright',
                textAlign: 'center',
              }}
            >
              {t(
                'Converting from BANANA to GNANA involves paying a 28% burn fee and a 2% reflect fee for a total cost of 30% per conversion. For every 1 BANANA you convert, you will receive 0.7 GNANA.',
              )}
            </Text>
          </Box>

          <Button
            variant="text"
            sx={{
              textDecorationLine: 'underline',
              fontSize: '12px',
              fontWeight: 500,
              color: 'primaryBright',

              '&&:hover': {
                color: 'primaryBright',
              },
            }}
          >
            {t('Learn More')} <ChevronRightIcon color="primaryBright" />
          </Button>
        </Flex>
      </Flex>

      <Flex sx={{ margin: '50px 0 0 0', maxWidth: '100%', width: '400px', flexDirection: 'column' }}>
        {/* FromTokenInput */}
        <InputPanel
          panelText="From"
          fromToken={bananaToken}
          toToken={gnanaToken}
          value={val}
          onUserInput={handleChange}
          setTradeValueUsd={setTradeValueUsd}
          fieldType={Field.INPUT}
          handleMaxInput={handleSelectMax}
          fullBalance={fullBalance}
          disabled={false}
        />
        {/* DownArrow */}
        <Flex
          sx={{
            width: '100%',
            height: '50px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Flex
            sx={{
              background: 'yellow',
              height: '30px',
              width: '30px',
              borderRadius: '30px',
              justifyContent: 'center',
              paddingRight: '1px',
            }}
          >
            <Svg icon="arrow" width="8px" color="primaryBright" />
          </Flex>
        </Flex>
        {/* ToTokenInput */}
        <InputPanel
          panelText="To"
          fromToken={gnanaToken}
          toToken={bananaToken}
          value={val}
          onUserInput={handleChange}
          setTradeValueUsd={setTradeValueUsd}
          fieldType={Field.OUTPUT}
          handleMaxInput={handleSelectMax}
          fullBalance={fullBalance}
          disabled={false}
        />
      </Flex>
    </Flex>
  )
}

export default React.memo(Gnana)
