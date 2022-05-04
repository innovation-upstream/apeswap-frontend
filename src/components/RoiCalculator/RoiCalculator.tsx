import { Modal, ModalHeader, Heading, ButtonMenu, ButtonMenuItem, Button, Svg } from '@ape.swap/uikit'
import React, { useState } from 'react'
import { Flex, Box, Text } from 'theme-ui'
import { useMintState } from 'state/mint/hooks'
import { Field } from 'state/RoiCalculator/action'
import PoolsListView from './Details'
import styles from './styles'
import CurrencyInputPanelRoi from './CurrencyInputRoi/index '

const RoiCalculator = () => {
  const [index, setIndex] = useState(0)
  const [index1, setIndex1] = useState(0)

  const handleClick = (newIndex) => setIndex(newIndex)
  const handleClick1 = (newIndex) => setIndex1(newIndex)
  const { independentField, typedValue } = useMintState()
  const formattedAmounts = {
    [independentField]: typedValue,
  }

  const onUserInput = () => {
    console.log('Ram ram')
  }

  const handleCurrencyASelect = () => {
    console.log('Ram ram')
  }
  const pools = [
    {
      APR: '42.51%',
      'Base APR': '37.56%',
      APY: '45.56%',
      'Farm Multiplier': '40X',
    },
  ]

  const poolsListView = pools.map((pool) => {
    // Token symbol logic is here temporarily for nfty
    return {
      open: true,
      expandedContent: (
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
              <Text>APR (incl. LP rewards):</Text>
              <Text>{pool.APR}</Text>
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
              <Text>Base APR (BANANA yield only): </Text> <Text>{pool['Base APR']}</Text>
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
              <Text>APY (1x daily compound):</Text> <Text>{pool.APY}</Text>
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
              <Text> Farm Multiplier:</Text> <Text>{pool['Farm Multiplier']}</Text>
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
              <Button>GET BANANA-BNB</Button>
            </Flex>
          </Box>
        </>
      ),
    }
  })
  const ButtonMenuProps = {
    style: {
      width: '100%',
    },
  }
  return (
    <>
      <Modal open maxWidth="400px" minWidth="400px">
        <ModalHeader>
          <Heading as="h4">ROI Calculator</Heading>
        </ModalHeader>

        <Flex>
          <Text sx={{ marginBottom: '5px', fontSize: '16px', fontWeight: '700' }}>BANANA-BNB LP</Text>
        </Flex>
        <Flex>
          <CurrencyInputPanelRoi
            value={formattedAmounts[Field.CURRENCY_INPUT]}
            onUserInput={onUserInput}
            onCurrencySelect={handleCurrencyASelect}
            showMaxButton
            // currency={currencies[Field.CURRENCY_A]}
            id="Roi-calculater-input"
          />
        </Flex>
        <Flex sx={{ justifyContent: 'space-between', padding: '10px 15px 30px', alignItems: 'center' }}>
          <Button size="sm" csx={{ marginRight: '17px' }}>
            $100
          </Button>
          <Button size="sm" csx={{ marginRight: '17px' }}>
            $1000
          </Button>
          <Text sx={{ width: '100%', maxWidth: '163px', textAlign: 'right' }}>Balance:</Text>
        </Flex>
        <Flex>
          <Text sx={{ marginBottom: '5px', fontSize: '16px', fontWeight: '700' }}>STAKED FOR</Text>
        </Flex>

        <ButtonMenu activeIndex={index} onClick={handleClick} variant="primary" size="md">
          <ButtonMenuItem sx={{ width: '100%', maxWidth: 'calc(100%/4)', height: '36px' }}>1D</ButtonMenuItem>
          <ButtonMenuItem sx={{ width: '100%', maxWidth: 'calc(100%/4)', height: '36px' }}> 7D</ButtonMenuItem>
          <ButtonMenuItem sx={{ width: '100%', maxWidth: 'calc(100%/4)', height: '36px' }}>14D</ButtonMenuItem>
          <ButtonMenuItem sx={{ width: '100%', maxWidth: 'calc(100%/4)', height: '36px' }}>30D</ButtonMenuItem>
        </ButtonMenu>
        <Flex>
          <Text sx={{ marginBottom: '5px', fontSize: '16px', fontWeight: '700' }}>COMPOUNDING EVERY</Text>
        </Flex>
        <Flex sx={{ padding: '0 0 30px' }}>
          <ButtonMenu activeIndex={index1} onClick={handleClick1}>
            <ButtonMenuItem sx={{ width: '100%', maxWidth: 'calc(100%/4)', height: '36px' }}> 1D</ButtonMenuItem>
            <ButtonMenuItem sx={{ width: '100%', maxWidth: 'calc(100%/4)', height: '36px' }}>7D</ButtonMenuItem>
            <ButtonMenuItem sx={{ width: '100%', maxWidth: 'calc(100%/4)', height: '36px' }}>14D</ButtonMenuItem>
            <ButtonMenuItem sx={{ width: '100%', maxWidth: 'calc(100%/4)', height: '36px' }}>30D</ButtonMenuItem>
          </ButtonMenu>
        </Flex>
        <Flex>
          <Text sx={{ marginBottom: '5px', fontSize: '16px', fontWeight: '700' }}>ROI AT CURRENT RATES</Text>
        </Flex>
        <Flex
          sx={{
            backgroundColor: 'textareaColor',
            borderRadius: '20px',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '17px 0',
            marginBottom: '25px',
          }}
        >
          <Box sx={{}}>
            <Svg icon="banana_token" width="46px" />
          </Box>
        </Flex>
        {poolsListView.map((view) => {
          return <PoolsListView expandedContent={view.expandedContent} open={view.open} />
        })}
      </Modal>
    </>
  )
}
export default RoiCalculator
