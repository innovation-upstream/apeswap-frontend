import {
  Modal,
  ModalHeader,
  Heading,
  ButtonMenu,
  ButtonMenuItem,
  Button,
  Svg,
  useMatchBreakpoints,
} from '@ape.swap/uikit'
import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { Flex, Box, Text } from 'theme-ui'
import { useDerivedMintInfo, useMintActionHandlers, useMintState } from 'state/mint/hooks'
import { CurrencyAmount, TokenAmount } from '@apeswapfinance/sdk'
import styled from 'styled-components'
import { useCurrency } from 'hooks/Tokens'
import { useCurrencyBalance } from 'state/wallet/hooks'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import maxAmountSpend from 'utils/maxAmountSpend'
import {
  calculateBananaEarnedPerThousandDollars,
  apyModalRoi,
  tokenEarnedPerThousandDollarsCompounding,
} from 'utils/compoundApyHelpers'
import { useFarms } from 'state/farms/hooks'
import { Field } from 'state/mint/actions'
import CurrencyInputPanelRoi from './CurrencyInputRoi/index '
import DetailsContent from './DetailsContent'
import Details from './Details'

const RoiCalculator = () => {
  const [indexStaked, setIndexStaked] = useState(0)
  const [stakedDay, setStakedDay] = useState(1)
  const [compoundDays, setCompoundDays] = useState(null)
  const [indexCompound, setIndexCompound] = useState(null)
  const [dollarbuttons, setDollarbuttons] = useState(null)
  const { account } = useActiveWeb3React()
  const farmsLP = useFarms(account)

  const rewardTokenPrice = farmsLP[1]?.bananaPrice

  const apy = parseFloat(farmsLP[1]?.apr) / 100 + parseFloat(farmsLP[1]?.lpApr) / 100

  const farmApy = new BigNumber(apy).times(new BigNumber(100)).toNumber()
  const tokenPrice =
    typeof farmsLP[1]?.bananaPrice === 'number' ? farmsLP[1]?.bananaPrice : new BigNumber(rewardTokenPrice).toNumber()
  const oneThousandDollarsWorthOfBanana = 1000 / tokenPrice
  const bananaEarnedPerThousand1D = calculateBananaEarnedPerThousandDollars({
    numberOfDays: stakedDay,
    farmApy,
    rewardTokenPrice,
  })
  const compoundROIRates = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: compoundDays,
    farmApr: parseFloat(farmsLP[1]?.lpApr + farmsLP[1]?.apr),
    tokenPrice: tokenPrice && tokenPrice,
  })

  const percentageStaked = apyModalRoi({
    amountEarned: bananaEarnedPerThousand1D,
    amountInvested: oneThousandDollarsWorthOfBanana,
  })
  const percentageCompound = apyModalRoi({
    amountEarned: compoundROIRates,
    amountInvested: oneThousandDollarsWorthOfBanana,
  })

  const handleClickStaked = (newIndex) => {
    setIndexStaked(newIndex)
    setIndexCompound(null)
    switch (newIndex) {
      case 0:
        setStakedDay(1)
        break
      case 1:
        setStakedDay(7)
        break
      case 2:
        setStakedDay(14)
        break
      case 3:
        setStakedDay(30)
        break
      default:
        setStakedDay(1)
    }
  }
  const handleClickCompound = (newIndex) => {
    setIndexCompound(newIndex)
    setIndexStaked(null)
    switch (newIndex) {
      case 0:
        setCompoundDays(1)
        break
      case 1:
        setCompoundDays(7)
        break
      case 2:
        setCompoundDays(14)
        break
      case 3:
        setCompoundDays(30)
        break
      default:
        setCompoundDays(null)
    }
  }
  const { independentField, typedValue } = useMintState()

  const [currencyA1, setcurrencyA1] = useState('ETH')
  const currencyA = useCurrency(currencyA1)

  const { isMd, isSm, isXs } = useMatchBreakpoints()
  const isMobile = isMd || isSm || isXs

  const { currencies, currencyBalances, noLiquidity, liquidityMinted, poolTokenPercentage, error } = useDerivedMintInfo(
    currencyA ?? undefined,
    undefined,
  )

  const { onFieldAInput } = useMintActionHandlers(noLiquidity)
  const balanceA = useCurrencyBalance(account ?? undefined, currencies[Field.CURRENCY_A])

  const StyledBalanceText = styled(Text)`
    white-space: nowrap;
    overflow: hidden;
    max-width: 5rem;
    text-overflow: ellipsis;
  `

  function Balance({ balance }: { balance: CurrencyAmount }) {
    return <StyledBalanceText title={balance?.toExact()}>{balance?.toSignificant(4)}</StyledBalanceText>
  }

  const formattedAmounts = {
    [independentField]: typedValue,
  }
  // get the max amounts user can add
  const maxAmounts: { [field in Field]?: TokenAmount } = [Field.CURRENCY_A, Field.CURRENCY_B].reduce(
    (accumulator, field) => {
      return {
        ...accumulator,
        [field]: maxAmountSpend(currencyBalances[field]),
      }
    },
    {},
  )
  const handleButton = (figure: string) => {
    if (figure === '100') {
      setDollarbuttons(100)
    } else setDollarbuttons(1000)
  }

  const handleCurrencyASelect = () => {
    console.log('for preventing error')
  }
  const modalProps = {
    style: {
      height: '100%',
      maxHeight: '500px',
      overflowY: 'auto',
    },
  }

  const mobileProps = isMobile ? modalProps : ''

  // eslint-disable-next-line no-restricted-globals
  const percentageStakedValue = isNaN(Number(percentageStaked)) ? 'Loading...' : percentageStaked
  // eslint-disable-next-line no-restricted-globals
  const percentageCompoundValue = isNaN(Number(percentageCompound)) ? 'Loading...' : percentageCompound

  console.log(
    'bananaEarnedPerThousand1D',
    // eslint-disable-next-line no-restricted-globals
    isNaN(Number(bananaEarnedPerThousand1D)),
    // eslint-disable-next-line no-restricted-globals
    isNaN(Number(percentageCompound)),
    // eslint-disable-next-line no-restricted-globals
    isNaN(Number(compoundROIRates)),
  )
  return (
    <>
      <Modal open maxWidth={isMobile ? '320px' : '400px'} minWidth={isMobile ? '320px' : '400px'} {...mobileProps}>
        <ModalHeader>
          <Heading as="h4">ROI Calculator</Heading>
        </ModalHeader>

        <Flex>
          <Text sx={{ marginBottom: '5px', fontSize: '16px', fontWeight: '700' }}>BANANA-BNB LP</Text>
        </Flex>
        <Flex>
          <CurrencyInputPanelRoi
            value={dollarbuttons || formattedAmounts[Field.CURRENCY_A]}
            onUserInput={onFieldAInput}
            onCurrencySelect={handleCurrencyASelect}
            showMaxButton
            onMax={() => {
              setDollarbuttons(null)
              onFieldAInput(maxAmounts[Field.CURRENCY_A]?.toExact() ?? '')
            }}
            currency={currencies[Field.CURRENCY_A]}
            id="Roi-calculater-input"
            setDollarbuttons={setDollarbuttons}
          />
        </Flex>
        <Flex sx={{ justifyContent: 'space-between', padding: '10px 15px 30px', alignItems: 'center' }}>
          <Button size="sm" onClick={() => handleButton('100')} csx={{ marginRight: '17px' }}>
            $100
          </Button>
          <Button onClick={() => handleButton('1000')} size="sm" csx={{ marginRight: '17px' }}>
            $1000
          </Button>
          <Text sx={{ width: '100%', maxWidth: '163px', textAlign: 'right' }}>
            Balance:{<Balance balance={balanceA} /> ? <Balance balance={balanceA} /> : 'Loading'}
          </Text>
        </Flex>
        <Flex>
          <Text sx={{ marginBottom: '5px', fontSize: '16px', fontWeight: '700' }}>STAKED FOR</Text>
        </Flex>
        <Flex sx={{ padding: '0 0 30px' }}>
          <ButtonMenu activeIndex={indexStaked} onClick={handleClickStaked} size={isMobile ? 'sm' : 'md'}>
            <ButtonMenuItem
              sx={{
                width: '100%',
                maxWidth: 'calc(100%/4)',
                height: '36px',
                backgroundColor: indexStaked !== 0 ? 'white3' : 'yellow',
                color: indexStaked !== 0 ? 'primaryButtonDisable' : 'White',
                border: '0px',
                borderTopRightRadius: indexStaked === 0 ? '10px' : '0px',
                borderBottomLeftRadius: indexStaked === 0 ? '10px' : '0px',
              }}
            >
              1D
            </ButtonMenuItem>
            <ButtonMenuItem
              sx={{
                width: '100%',
                maxWidth: 'calc(100%/4)',
                height: '36px',
                backgroundColor: indexStaked !== 1 ? 'white3' : 'yellow',
                color: indexStaked !== 1 ? 'primaryButtonDisable' : 'White',
                border: '0px',
                borderRadius: indexStaked === 1 ? '10px' : '0px',
              }}
            >
              7D
            </ButtonMenuItem>
            <ButtonMenuItem
              sx={{
                width: '100%',
                maxWidth: 'calc(100%/4)',
                height: '36px',
                backgroundColor: indexStaked !== 2 ? 'white3' : 'yellow',
                color: indexStaked !== 2 ? 'primaryButtonDisable' : 'White',
                border: '0px',
                borderRadius: indexStaked === 2 ? '10px' : '0px',
              }}
            >
              14D
            </ButtonMenuItem>
            <ButtonMenuItem
              sx={{
                width: '100%',
                maxWidth: 'calc(100%/4)',
                height: '36px',
                backgroundColor: indexStaked !== 3 ? 'white3' : 'yellow',
                color: indexStaked !== 3 ? 'primaryButtonDisable' : 'White',
                border: '0px',
                borderTopLeftRadius: indexStaked === 3 ? '10px' : '0px',
                borderBottomLeftRadius: indexStaked === 3 ? '10px' : '0px',
              }}
            >
              30D
            </ButtonMenuItem>
          </ButtonMenu>
        </Flex>
        <Flex>
          <Text sx={{ marginBottom: '5px', fontSize: '16px', fontWeight: '700' }}>COMPOUNDING EVERY</Text>
        </Flex>
        <Flex sx={{ padding: '0 0 30px' }}>
          <ButtonMenu activeIndex={indexCompound} onClick={handleClickCompound} size={isMobile ? 'sm' : 'md'}>
            <ButtonMenuItem
              sx={{
                width: '100%',
                maxWidth: 'calc(100%/4)',
                height: '36px',
                backgroundColor: indexCompound !== 0 ? 'white3' : 'yellow',
                color: indexCompound !== 0 ? 'primaryButtonDisable' : 'White',
                border: '0px',
                borderTopRightRadius: indexCompound === 0 ? '10px' : '0px',
                borderBottomRightRadius: indexCompound === 0 ? '10px' : '0px',
              }}
            >
              1D
            </ButtonMenuItem>
            <ButtonMenuItem
              sx={{
                width: '100%',
                maxWidth: 'calc(100%/4)',
                height: '36px',
                backgroundColor: indexCompound !== 1 ? 'white3' : 'yellow',
                color: indexCompound !== 1 ? 'primaryButtonDisable' : 'White',
                border: '0px',
                borderRadius: indexCompound === 1 ? '10px' : '0px',
              }}
            >
              7D
            </ButtonMenuItem>
            <ButtonMenuItem
              sx={{
                width: '100%',
                maxWidth: 'calc(100%/4)',
                height: '36px',
                backgroundColor: indexCompound !== 2 ? 'white3' : 'yellow',
                color: indexCompound !== 2 ? 'primaryButtonDisable' : 'White',
                border: '0px',
                borderRadius: indexCompound === 2 ? '10px' : '0px',
              }}
            >
              14D
            </ButtonMenuItem>
            <ButtonMenuItem
              sx={{
                width: '100%',
                maxWidth: 'calc(100%/4)',
                height: '36px',
                backgroundColor: indexCompound !== 3 ? 'white3' : 'yellow',
                color: indexCompound !== 3 ? 'primaryButtonDisable' : 'White',
                border: '0px',
                borderTopLeftRadius: indexCompound === 3 ? '10px' : '0px',
                borderBottomLeftRadius: indexCompound === 3 ? '10px' : '0px',
              }}
            >
              30D
            </ButtonMenuItem>
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
          <Box sx={{ display: 'flex' }}>
            <Svg icon="banana_token" width="46px" />
            <Box sx={{ paddingLeft: '20px' }}>
              <Text variant="lg" color="white1" sx={{ display: 'block' }}>
                ${(indexStaked !== null && bananaEarnedPerThousand1D) || (indexCompound !== null && compoundROIRates)}
              </Text>

              <Text variant="sm" color="white1">
                ~{(indexStaked !== null && bananaEarnedPerThousand1D) || (indexCompound !== null && compoundROIRates)}{' '}
                BANANA
              </Text>
              <Text variant="sm" color="white1">
                (
                {(indexStaked !== null && percentageStakedValue) || (indexCompound !== null && percentageCompoundValue)}
                %)
              </Text>
            </Box>
          </Box>
        </Flex>
        {Details?.map((view) => {
          return <DetailsContent expandedContent={view.expandedContent} open={view.open} />
        })}
      </Modal>
    </>
  )
}
export default RoiCalculator
