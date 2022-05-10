import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Modal } from '@apeswapfinance/uikit'
import {
  calculateBananaEarnedPerThousandDollars,
  apyModalRoi,
  tokenEarnedPerThousandDollarsCompounding,
} from 'utils/compoundApyHelpers'
import { Field } from 'state/mint/actions'
import maxAmountSpend from 'utils/maxAmountSpend'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useDerivedMintInfo, useMintActionHandlers, useMintState } from 'state/mint/hooks'
import { useCurrency } from 'hooks/Tokens'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { Button, ButtonMenu, useMatchBreakpoints, ButtonMenuItem, Svg } from '@ape.swap/uikit'
import { CurrencyAmount, TokenAmount } from '@apeswapfinance/sdk'
import CurrencyInputPanelRoi from 'components/ApyCalculator/CurrencyInputRoi/index '
import { Box, Flex, Link, Text } from 'theme-ui'
import DetailsContent from 'components/ApyCalculator/DetailsContent'
import styles from 'components/ApyCalculator/styles'

interface ApyCalculatorModalProps {
  onDismiss?: () => void
  lpLabel?: string
  rewardTokenName?: string
  rewardTokenPrice?: number
  apy?: number
  addLiquidityUrl?: string
  apr?: number
  lpApr?: number
  multiplier?: number
  detailApy?: number
}

// eslint-disable-next-line no-empty-pattern
const ApyCalculatorModal: React.FC<ApyCalculatorModalProps> = (
  // eslint-disable-next-line no-empty-pattern
  { onDismiss, lpLabel, rewardTokenName, rewardTokenPrice, apy, addLiquidityUrl, apr, lpApr, multiplier, detailApy },
) => {
  const [indexStaked, setIndexStaked] = useState(0)
  const [stakedDay, setStakedDay] = useState(1)
  const [compoundDays, setCompoundDays] = useState(1)
  const [indexCompound, setIndexCompound] = useState(0)
  const [dollarbuttons, setDollarbuttons] = useState(null)
  const { account } = useActiveWeb3React()

  const tokenPrice =
    typeof rewardTokenPrice === 'number' ? rewardTokenPrice : new BigNumber(rewardTokenPrice).toNumber()
  const oneThousandDollarsWorthOfBanana = 1000 / tokenPrice

  // const bananaEarnedPerThousand1D = calculateBananaEarnedPerThousandDollars({
  //   numberOfDays: stakedDay,
  //   farmApy,
  //   rewardTokenPrice,
  // })

  const handleClickStaked = (newIndex) => {
    setIndexStaked(newIndex)
    // setIndexCompound(null)
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
        setCompoundDays(1)
    }
  }
  const { independentField, typedValue } = useMintState()
  const currencyA = useCurrency('ETH')

  const { isMd, isSm, isXs } = useMatchBreakpoints()
  const isMobile = isMd || isSm || isXs

  const { currencies, currencyBalances, noLiquidity } = useDerivedMintInfo(currencyA ?? undefined, undefined)

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

  const modalPropsMobile = {
    style: {
      height: '100%',
      maxHeight: '500px',
      overflowY: 'auto',
    },
  }

  const modalProps = {
    style: {
      overflowY: 'auto',
      maxHeight: 'calc(100% - 10px)',
      height: 'auto',
    },
  }
  const aprRewards = (lpApr + apr).toFixed(2)
  const compoundROIRates = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: stakedDay,
    farmApr: lpApr + apr,
    tokenPrice,
    compoundFrequency: compoundDays,
    dollarBalance: dollarbuttons || formattedAmounts[Field.CURRENCY_A],
  })
  const percentageCompound = apyModalRoi({
    amountEarned: compoundROIRates,
    amountInvested: oneThousandDollarsWorthOfBanana,
  })

  const mobileProps = isMobile ? modalPropsMobile : modalProps

  // eslint-disable-next-line no-restricted-globals
  const compoundROIRatesValue = isNaN(Number(compoundROIRates)) ? 'Loading...' : compoundROIRates
  // eslint-disable-next-line no-restricted-globals
  const percentageCompoundValue = isNaN(Number(percentageCompound)) ? 'Loading...' : percentageCompound

  const Data = () => {
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
            <Text sx={{ fontSize: isMobile ? '12px' : '14px' }}>APR (incl. LP rewards):</Text>
            <Text sx={{ fontSize: isMobile ? '12px' : '14px' }}>{aprRewards}%</Text>
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
            <Text sx={{ fontSize: isMobile ? '12px' : '14px' }}>Base APR (BANANA yield only): </Text>{' '}
            <Text sx={{ fontSize: isMobile ? '12px' : '14px' }}>{apr}%</Text>
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
            <Text sx={{ fontSize: isMobile ? '12px' : '14px' }}>APY (1x daily compound):</Text>{' '}
            <Text sx={{ fontSize: isMobile ? '12px' : '14px' }}>{detailApy}%</Text>
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
            <Text sx={{ fontSize: isMobile ? '12px' : '14px' }}> Farm Multiplier:</Text>{' '}
            <Text sx={{ fontSize: isMobile ? '12px' : '14px' }}>{multiplier}</Text>
          </Flex>
          <Box as="ul" sx={{ paddingBottom: '25px' }}>
            <Flex as="li">
              <Text sx={styles?.text}>• Calculated based on current rates.</Text>
            </Flex>
            <Flex as="li">
              <Text sx={styles?.text}>
                • LP rewards: 0.17% trading fees, distributed proportionally among LP token holders.{' '}
              </Text>
            </Flex>
            <Flex as="li">
              <Text sx={styles?.text}>
                • All figures are estimates provided for your convenience only, and by no means represent guaranteed
                returns.
              </Text>
            </Flex>
          </Box>
          <Flex sx={{ justifyContent: 'center' }}>
            <Link href={addLiquidityUrl}>
              <Button size={isMobile ? 'sm' : 'md'}>GET {lpLabel}</Button>
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

  return (
    <>
      <Modal
        onDismiss={onDismiss}
        title="ROI Calculator"
        maxWidth={isMobile ? '320px' : '400px'}
        minWidth={isMobile ? '320px' : '400px'}
        {...mobileProps}
      >
        <Flex>
          <Text sx={{ marginBottom: '5px', fontSize: '16px', fontWeight: '700' }}>{lpLabel}</Text>
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
          <Box sx={{ display: 'flex', fontWeight: '700' }}>
            <Svg icon="banana_token" width="46px" />
            <Box sx={{ paddingLeft: '20px' }}>
              <Text variant="lg" color="white1" sx={{ display: 'block' }}>
                ${compoundROIRatesValue}
              </Text>

              <Text variant="sm" color="white1">
                ~{compoundROIRatesValue} BANANA
              </Text>
              <Text variant="sm" color="white1">
                ({percentageCompoundValue}%)
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

export default ApyCalculatorModal
