import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Modal, Tab, Tabs } from '@apeswapfinance/uikit'
import { apyModalRoi, tokenEarnedPerThousandDollarsCompounding } from 'utils/compoundApyHelpers'
import { Field } from 'state/mint/actions'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useDerivedMintInfo } from 'state/mint/hooks'
import { useCurrency } from 'hooks/Tokens'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { Button, Svg, Text } from '@ape.swap/uikit'
import { CurrencyAmount } from '@apeswapfinance/sdk'
import CurrencyInputPanelRoi from 'components/ApyCalculator/CurrencyInputRoi/index '
import { Box, Flex, Heading } from 'theme-ui'
import DetailsContent from 'components/ApyCalculator/DetailsContent'
import useIsMobile from 'hooks/useIsMobile'
import { useTranslation } from 'contexts/Localization'
import styles from './styles'

const StyledBalanceText = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  max-width: 5rem;
  text-overflow: ellipsis;
`

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
  lpAddresses?: string
}

const amountButtons = ['100', '1000']
const intervals = [1, 7, 14, 30]

const ApyCalculatorModal: React.FC<ApyCalculatorModalProps> = (props) => {
  const { onDismiss, lpLabel, rewardTokenPrice, apr, lpApr, lpAddresses } = props
  const [numberOfDays, setNumberOfDays] = useState(1)
  const [compoundFrequency, setCompoundFrequency] = useState(1)
  const [amountDollars, setAmountDollars] = useState('0')
  const [inputValue, setInputValue] = useState('0')
  const { account } = useActiveWeb3React()
  const isMobile = useIsMobile()
  const { t } = useTranslation()

  const tokenPrice =
    typeof rewardTokenPrice === 'number' ? rewardTokenPrice : new BigNumber(rewardTokenPrice).toNumber()
  const oneThousandDollarsWorthOfBanana = 1000 / tokenPrice

  const onIntervalClick = (type: 'staked' | 'compound') => (index: number) => {
    if (type === 'staked') {
      setNumberOfDays(intervals[index])
    } else {
      setCompoundFrequency(intervals[index])
    }
  }

  const onUserInput = (value: string) => {
    setInputValue(value)
    setAmountDollars(null)
  }

  const currencyA = useCurrency(lpAddresses)
  const { currencies } = useDerivedMintInfo(currencyA ?? undefined, undefined)
  const balanceA = useCurrencyBalance(account ?? undefined, currencies[Field.CURRENCY_A])

  function Balance({ balance }: { balance: CurrencyAmount }) {
    return <StyledBalanceText title={balance?.toExact()}>{balance?.toSignificant(4)}</StyledBalanceText>
  }

  const modalProps = {
    style: {
      overflowY: 'auto',
      maxHeight: '85vh',
    },
  }

  const compoundROIRates = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays,
    farmApr: lpApr + apr,
    tokenPrice,
    compoundFrequency,
    amountDollar: parseFloat(amountDollars || inputValue),
  })

  const percentageCompound = apyModalRoi({
    amountEarned: compoundROIRates,
    amountInvested: oneThousandDollarsWorthOfBanana,
  })

  const compoundROIRatesValue = Number.isNaN(compoundROIRates) ? 0 : compoundROIRates
  const percentageCompoundValue = Number.isNaN(parseFloat(percentageCompound)) ? 0 : percentageCompound

  return (
    <Modal
      onDismiss={onDismiss}
      title={t('ROI Calculator')}
      maxWidth={isMobile ? '320px' : '400px'}
      minWidth={isMobile ? '320px' : '400px'}
      {...modalProps}
    >
      <Heading as="h3" sx={styles.title}>
        {t(lpLabel)}&nbsp;&nbsp;LP
      </Heading>
      <CurrencyInputPanelRoi
        value={amountDollars?.toString()}
        onUserInput={onUserInput}
        currency={currencies[Field.CURRENCY_A]}
        isLp
      />
      <Flex sx={styles.buttonsContainer}>
        <Flex sx={{ columnGap: ['8px', '17px'] }}>
          {amountButtons.map((amount) => (
            <Button key={`${amount}`} size="sm" onClick={() => setAmountDollars(amount)}>
              ${amount}
            </Button>
          ))}
        </Flex>
        <Text>
          {t('Balance: ')}
          <Balance balance={balanceA} />
        </Text>
      </Flex>
      <Heading sx={styles.title}>{t('STAKED FOR')}</Heading>
      <Box sx={{ marginBottom: '30px' }}>
        <Tabs activeTab={intervals.indexOf(numberOfDays)} variant="fullWidth">
          {intervals.map((interval, index) => (
            <Tab
              key={`${interval}D`}
              index={index}
              label={t(`${interval}D`)}
              onClick={onIntervalClick('staked')}
              size="xsm"
              variant="fullWidth"
            />
          ))}
        </Tabs>
      </Box>
      <Heading sx={styles.title}>{t('COMPOUNDING EVERY')}</Heading>
      <Box sx={{ marginBottom: '30px' }}>
        <Tabs activeTab={intervals.indexOf(compoundFrequency)} variant="fullWidth">
          {intervals.map((interval, index) => (
            <Tab
              key={`${interval}D`}
              index={index}
              label={t(`${interval}D`)}
              onClick={onIntervalClick('compound')}
              size="xsm"
              variant="fullWidth"
            />
          ))}
        </Tabs>
      </Box>
      <Heading sx={styles.title}>{t('ROI AT CURRENT RATES')}</Heading>
      <Flex sx={styles.roiContainer}>
        <Svg icon="banana_token" width="46px" />
        <Box>
          <Text as="p" weight="bold" variant="lg" color="white1">
            ${compoundROIRatesValue}
          </Text>

          <Box sx={styles.roiBanana}>
            <Text variant="sm" color="white1">
              ~{compoundROIRatesValue} BANANA
            </Text>
            <Text variant="sm" color="white1">
              ({percentageCompoundValue}%)
            </Text>
          </Box>
        </Box>
      </Flex>
      <DetailsContent {...props} aprRewards={(lpApr + apr).toFixed(2)} />
    </Modal>
  )
}

export default ApyCalculatorModal
