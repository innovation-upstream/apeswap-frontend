import React, { useCallback, useEffect, useRef, useState } from 'react'
import BigNumber from 'bignumber.js'
import { apyModalRoi, tokenEarnedPerThousandDollarsCompounding } from 'utils/compoundApyHelpers'
import { Field } from 'state/mint/actions'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useDerivedMintInfo } from 'state/mint/hooks'
import { useCurrency } from 'hooks/Tokens'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { Modal, Button, Text, Tab, Tabs } from '@ape.swap/uikit'
import Logo from 'components/Logo/Logo'
import { Box, Flex, Heading } from 'theme-ui'
import useIsMobile from 'hooks/useIsMobile'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import useTokenUrl from 'hooks/useTokenUrl'
import maxAmountSpend from 'utils/maxAmountSpend'
import { Token } from '@apeswapfinance/sdk'
import { getTokenUsdPrice } from 'utils/getTokenUsdPrice'
import CurrencyInputPanel from './CurrencyInput'
import DetailsContent from './DetailsContent'
import styles from './styles'

interface RoiCalculatorModalProps {
  onDismiss?: () => void
  lpLabel?: string
  rewardTokenName?: string
  rewardTokenPrice?: number
  apy?: number
  addLiquidityUrl?: string
  apr?: number
  lpApr?: number
  multiplier?: number
  lpAddresses?: string
  tokenAddress?: string
  isLp?: boolean
}

const modalStyle = {
  style: {
    overflowY: 'auto',
    maxHeight: '85vh',
  },
}

const amountButtons = ['100', '1000']
const intervals = [1, 7, 14, 30]

const RoiCalculatorModal: React.FC<RoiCalculatorModalProps> = (props) => {
  const { onDismiss, lpLabel, rewardTokenName, rewardTokenPrice, apr, lpApr, lpAddresses, tokenAddress, isLp } = props
  const [numberOfDays, setNumberOfDays] = useState(1)
  const [compoundFrequency, setCompoundFrequency] = useState(1)
  const [amountDollars, setAmountDollars] = useState('1000')
  const [inputValue, setInputValue] = useState('0')
  const [keySuffix, setKeySuffix] = useState(0)
  const { account, chainId } = useActiveWeb3React()
  const isMobile = useIsMobile()
  const { t } = useTranslation()
  const { isDark } = useTheme()
  const [tokenUrl] = useTokenUrl([rewardTokenName])
  const firstRun = useRef(true)

  useEffect(() => {
    if (compoundFrequency > numberOfDays) {
      setCompoundFrequency(intervals?.[0])
    }
  }, [compoundFrequency, numberOfDays])

  const tokenPrice =
    typeof rewardTokenPrice === 'number' ? rewardTokenPrice : new BigNumber(rewardTokenPrice).toNumber()
  const tokensWorthForDollarSelected = parseFloat(amountDollars || inputValue) / tokenPrice

  const onIntervalClick = useCallback(
    (type: 'staked' | 'compound') => (index: number) => {
      if (type === 'staked') {
        setNumberOfDays(intervals[index])
      } else {
        setCompoundFrequency(intervals[index])
      }
    },
    [setNumberOfDays, setCompoundFrequency],
  )

  const currencyA = useCurrency(isLp ? lpAddresses : tokenAddress)
  const { currencies } = useDerivedMintInfo(currencyA ?? undefined, undefined)
  const balanceA = useCurrencyBalance(account ?? undefined, currencies[Field.CURRENCY_A])

  const compoundROIRates = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays,
    farmApr: apr + (lpApr || 0),
    tokenPrice,
    roundingDecimals: 8,
    // Get the fraction of 1 day
    compoundFrequency: 1 / compoundFrequency,
    amountDollar: parseFloat(amountDollars || inputValue),
  })

  const percentageCompound = apyModalRoi({
    amountEarned: compoundROIRates,
    amountInvested: tokensWorthForDollarSelected,
  })

  const compoundROIRatesValue = Number.isNaN(compoundROIRates) ? 0 : compoundROIRates
  const percentageCompoundValue = Number.isNaN(parseFloat(percentageCompound)) ? 0 : percentageCompound

  const currency = currencies[Field.CURRENCY_A]
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const [selectedTokenPrice, setSelectedTokenPrice] = useState<number>(null)
  const maxAmount = maxAmountSpend(selectedCurrencyBalance)?.toExact() || '0'

  const onTokenAmountChange = useCallback(
    (value: string) => {
      setInputValue(value)
      const fiatValue = parseFloat(
        !!currency && inputValue ? (selectedTokenPrice * parseFloat(inputValue))?.toFixed(2) : '0',
      )
      setAmountDollars(Number.isFinite(fiatValue) ? fiatValue.toString() : '0')
    },
    [currency, inputValue, selectedTokenPrice],
  )

  const onDollarAmountChange = useCallback(
    (value: string) => {
      setAmountDollars(value)
      const expectedValue = parseFloat(!!currency && value ? (parseFloat(value) / selectedTokenPrice)?.toFixed(2) : '0')
      setInputValue(Number.isFinite(expectedValue) ? expectedValue.toString() : '0')
    },
    [currency, selectedTokenPrice],
  )

  useEffect(() => {
    if (!currency) return
    const isFirstRun = firstRun.current
    const fetchTokenPrice = async () => {
      const isNative = currency?.symbol === 'ETH'
      const tokenPriceReturned = await getTokenUsdPrice(
        chainId,
        currency instanceof Token ? currency?.address : '',
        currency?.decimals,
        isLp,
        isNative,
      )
      setSelectedTokenPrice(tokenPriceReturned)
      if (isFirstRun) {
        onDollarAmountChange('1000')
        firstRun.current = false
      }
    }
    fetchTokenPrice()
  }, [chainId, isLp, currency, onDollarAmountChange])

  return (
    <Modal
      onDismiss={onDismiss}
      title={t('ROI Calculator')}
      minWidth={isMobile ? '320px' : '400px'}
      maxWidth={isMobile ? '90vw' : '400px'}
      onAnimationComplete={() => setKeySuffix(keySuffix + 1)}
      {...modalStyle}
    >
      <Box>
        <Heading as="h3" sx={styles.title}>
          {t(lpLabel)} {isLp && 'LP'}
        </Heading>
        <CurrencyInputPanel
          dollarValue={amountDollars?.toString()}
          tokenValue={inputValue}
          onUserInput={onTokenAmountChange}
          onMax={() => onTokenAmountChange(maxAmount)}
        />
        <Flex sx={styles.buttonsContainer}>
          <Flex sx={{ columnGap: ['8px', '17px'] }}>
            {amountButtons.map((amount) => (
              <Button key={`${amount}`} size="sm" onClick={() => onDollarAmountChange(amount)}>
                ${amount}
              </Button>
            ))}
          </Flex>
          <Text>
            {t('Balance: ')}
            <Text sx={styles.balance}>{balanceA?.toSignificant(4)}</Text>
          </Text>
        </Flex>
        <Heading sx={styles.title}>{t('STAKING PERIOD')}</Heading>
        <Box sx={styles.tabContainer}>
          <Tabs activeTab={intervals.indexOf(numberOfDays)} variant="fullWidth">
            {intervals.map((interval, index) => (
              <Tab
                key={`${interval}${keySuffix}D`}
                index={index}
                label={t(`${interval}D`)}
                onClick={onIntervalClick('staked')}
                size="sm"
                variant="fullWidth"
              />
            ))}
          </Tabs>
        </Box>
        <Heading sx={styles.title}>{t('COMPOUNDING FREQUENCY')}</Heading>
        <Box sx={styles.tabContainer}>
          <Tabs activeTab={intervals.indexOf(compoundFrequency)} variant="fullWidth">
            {intervals.map((interval, index) => (
              <Tab
                key={`${interval}${keySuffix}D`}
                index={index}
                label={t(`${interval}D`)}
                onClick={onIntervalClick('compound')}
                size="sm"
                variant="fullWidth"
                disabled={interval > numberOfDays}
              />
            ))}
          </Tabs>
        </Box>
        <Heading sx={styles.title}>{t('ROI AT CURRENT RATES')}</Heading>
        <Flex sx={styles.roiContainer(isDark)}>
          <Logo srcs={tokenUrl || []} width={46} />
          <Box>
            <Text sx={{ fontSize: '24px' }} as="p" weight="bold" variant="lg" color="primaryBright">
              ${(compoundROIRatesValue * tokenPrice).toFixed(2)}
            </Text>

            <Box sx={styles.roiBanana}>
              <Text variant="sm" color="primaryBright">
                ~{compoundROIRatesValue.toFixed(2)} {rewardTokenName}
              </Text>
              <Text variant="sm" color="primaryBright">
                ({percentageCompoundValue}%)
              </Text>
            </Box>
          </Box>
        </Flex>
        <DetailsContent {...props} />
      </Box>
    </Modal>
  )
}

export default RoiCalculatorModal
