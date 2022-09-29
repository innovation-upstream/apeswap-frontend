/** @jsxImportSource theme-ui */
import React, { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { Button, Checkbox, ChevronRightIcon, Flex, Heading, Svg, Text } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useCurrency } from 'hooks/Tokens'
import { Field } from 'state/swap/actions'
import useTheme from 'hooks/useTheme'
import { useBananaAddress, useGoldenBananaAddress } from 'hooks/useAddress'
import { useBanana, useTreasury } from 'hooks/useContract'
import { useBuyGoldenBanana } from 'hooks/useGoldenBanana'
import { useToast } from 'state/hooks'
import { useCurrencyBalance } from 'state/wallet/hooks'
import useApproveTransaction from 'hooks/useApproveTransaction'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import UnlockButton from 'components/UnlockButton'
import Dots from 'components/Loader/Dots'
import DexPanel from 'views/Dex/components/DexPanel'
import { gnanaStyles } from './styles'
import { useUserSlippageTolerance, useUserUnlimitedGnana } from 'state/user/hooks'
import { Currency, CurrencyAmount, ZapType } from '@ape.swap/sdk'
import { useDerivedZapInfo, useSetZapInputList, useZapActionHandlers, useZapState } from '../../state/zap/hooks'
import maxAmountSpend from '../../utils/maxAmountSpend'
import { useZapCallback } from '../../hooks/useZapCallback'
import { GNANA } from '@apeswapfinance/uikit'
import contracts from '../../config/constants/contracts'

const ZapGnana = () => {
  useSetZapInputList()
  const [zapErrorMessage, setZapErrorMessage] = useState<string>(null)
  const [{ txHash, pairOut }, setTxHash] = useState({
    txHash: '',
    pairOut: null,
  })

  const { account } = useActiveWeb3React()
  const { isDark } = useTheme()
  const MAX_BUY = 5000
  const bananaToken = useCurrency(useBananaAddress())
  const gnanaToken = useCurrency(useGoldenBananaAddress())
  const { t } = useTranslation()
  const [unlimitedGnana, setUnlimitedGnanaMinting] = useUserUnlimitedGnana()
  const [unlimited, setUnlimited] = useState(unlimitedGnana)
  const treasuryContract = useTreasury()
  const [processing, setProcessing] = useState(false)
  const [triedMore, setTriedMore] = useState(false)

  const [val, setVal] = useState('0')
  const { handleBuy } = useBuyGoldenBanana()
  const gnanaVal = parseFloat(val) > 0 ? parseFloat(val) * 0.7 : 0
  const { toastSuccess } = useToast()
  const bananaContract = useBanana()
  const accountBananaBalance = useCurrencyBalance(account, bananaToken)
  const displayMax = unlimited ? 'unlimited' : MAX_BUY
  const fullBananaBalance = accountBananaBalance?.toExact()

  const handleChange = useCallback(
    (_, val) => {
      if (!unlimited && parseInt(val) > MAX_BUY) {
        setTriedMore(true)
        return
      }
      setVal(val)
    },
    [unlimited],
  )

  useEffect(() => {
    setTimeout(() => {
      setTriedMore(false)
    }, 600)
  }, [triedMore])

  const {
    isApproving: isApprovingBanana,
    isApproved: isApprovedBanana,
    handleApprove: handleApproveBanana,
  } = useApproveTransaction({
    onRequiresApproval: async (loadedAccount) => {
      try {
        const response = await bananaContract.allowance(loadedAccount, treasuryContract.address)
        const currentAllowance = new BigNumber(response.toString())
        return currentAllowance.gt(0)
      } catch (error) {
        return false
      }
    },
    onApprove: async () => {
      const trx = await bananaContract.approve(treasuryContract.address, ethers.constants.MaxUint256)
      return await trx.wait()
    },
    onSuccess: async () => toastSuccess(t('Approved!')),
  })

  const buyGnana = useCallback(async () => {
    try {
      setProcessing(true)
      await handleBuy(val)
      setProcessing(false)
      setVal('0')
    } catch (e) {
      setProcessing(false)
      console.warn(e)
    }
  }, [handleBuy, val])

  const handleCheckBox = useCallback(() => {
    setUnlimited(!unlimited)
    if (!unlimited) setUnlimitedGnanaMinting(true)
    if (unlimited) {
      setUnlimitedGnanaMinting(false)
      setVal('0')
    }
  }, [unlimited, setUnlimitedGnanaMinting])

  const disabled = processing || parseInt(val) === 0 || parseInt(val) > parseInt(fullBananaBalance)

  const renderActions = () => {
    if (!account) {
      return <UnlockButton fullWidth />
    }
    if (isApprovedBanana) {
      return (
        <Button variant="primary" onClick={buyGnana} disabled={disabled} fullWidth>
          {(processing && (
            <>
              {t('LOADING')}
              <Dots />
            </>
          )) ||
            t('CONVERT')}
        </Button>
      )
    }
    if (isApprovingBanana) {
      return (
        <Button variant="primary" onClick={handleApproveBanana} disabled={isApprovingBanana} fullWidth>
          {t('APPROVE CONTRACT')}
        </Button>
      )
    }
  }
  const { zap, inputError: zapInputError, currencyBalances } = useDerivedZapInfo()
  const { INPUT, typedValue, recipient, zapType } = useZapState()
  const [zapSlippage] = useUserSlippageTolerance(true)
  const { callback: zapCallback, error } = useZapCallback(
    zap,
    ZapType.ZAP_SINGLE_ASSET_POOL,
    zapSlippage,
    recipient,
    '0x0eE018eF954ca14A38bc2Aed702fB6CFA6ae6c69',
    null,
  )
  if (error) console.log(error)

  const currencyA = INPUT.currencyId
  const inputCurrency = useCurrency(currencyA)

  const { onUserInput, onInputSelect, onCurrencySelection } = useZapActionHandlers()

  const handleInputSelect = useCallback(
    (field: Field, currency: Currency) => {
      onInputSelect(field, currency)
    },
    [onInputSelect],
  )

  const handleMaxInput = useCallback(
    (field: Field) => {
      const maxAmounts: { [field in Field]?: CurrencyAmount } = {
        [Field.INPUT]: maxAmountSpend(currencyBalances[Field.INPUT]),
      }
      if (maxAmounts) {
        onUserInput(field, maxAmounts[field]?.toExact() ?? '')
      }
    },
    [currencyBalances, onUserInput],
  )

  const handleZap = useCallback(() => {
    setZapErrorMessage(null)
    zapCallback()
      .then((hash) => {
        setTxHash({ txHash: hash, pairOut: zap.pairOut.pair })
      })
      .catch((error) => {
        setZapErrorMessage(error.message)
      })
  }, [setTxHash, zap.pairOut.pair, zapCallback])
  if (zapErrorMessage) {
    console.log(zapErrorMessage)
  }

  const gnana = useCurrency(contracts.goldenBanana[56])

  useEffect(() => {
    onCurrencySelection(Field.OUTPUT, [gnana])
  }, [])

  return (
    <Flex sx={gnanaStyles.gnanaContainer}>
      <Flex
        sx={{
          ...gnanaStyles.headsUp,
          backgroundColor: (isDark && '#FFB30026') || 'yellow',
          opacity: (isDark && 1) || 0.7,
        }}
      >
        <Flex sx={gnanaStyles.headsUpHeader}>
          <Heading as="h1" sx={{ ...gnanaStyles.warningHeader, color: (isDark && 'yellow') || 'primaryBright' }}>
            {t('HEADS UP, APES!')}
          </Heading>

          <Flex sx={{ padding: '2px', fontSize: ['14px'] }}>
            <Text sx={gnanaStyles.headsUpDescription}>
              {t(
                'Buying GNANA involves paying a 28% burn fee and a 2% reflect fee for a total cost of 30%. This means that for every 1 BANANA you trade in, you will receive 0.7 GNANA.',
              )}
            </Text>
          </Flex>

          <Button
            variant="text"
            sx={gnanaStyles.learnMoreBtn}
            onClick={() => window.open('https://apeswap.finance/gnana', '_blank')}
          >
            {t('Learn More')} <ChevronRightIcon color="primaryBright" />
          </Button>
        </Flex>
      </Flex>

      <Flex sx={gnanaStyles.transactions}>
        <Flex sx={{ flexDirection: 'column' }}>
          {/* FromTokenInput */}
          <DexPanel
            value={typedValue}
            panelText="From:"
            currency={inputCurrency}
            otherCurrency={gnanaToken}
            fieldType={Field.INPUT}
            onCurrencySelect={handleInputSelect}
            onUserInput={onUserInput}
            handleMaxInput={handleMaxInput}
            isZapInput
          />
          <Text sx={{ color: triedMore ? '#ff0000' : null, fontSize: '12px', fontWeight: 600 }}>
            {t('*Current max conversion is %displayMax%', { displayMax })}
          </Text>
          {/* DownArrow */}
          <Flex sx={gnanaStyles.arrowDownContainer}>
            <Flex sx={gnanaStyles.arrowDown}>
              <Svg icon="arrow" width="8px" color="primaryBright" />
            </Flex>
          </Flex>
          <DexPanel
            value={gnanaVal.toString()}
            panelText="To"
            currency={gnanaToken}
            otherCurrency={bananaToken}
            onUserInput={handleChange}
            fieldType={Field.OUTPUT}
            handleMaxInput={null}
            onCurrencySelect={null}
            disabled
            ordersDisabled
            disableTokenSelect
          />
          {/* ToTokenInput */}
          <Flex sx={{ marginTop: '20px', alignItems: 'center' }}>
            <Flex sx={gnanaStyles.checkboxContainer}>
              <Checkbox
                id="checkbox"
                checked={unlimited}
                sx={{ backgroundColor: 'white2' }}
                onChange={handleCheckBox}
              />
            </Flex>
            <Text sx={gnanaStyles.checkboxText}>
              {t('I understand how GNANA works and I want to enable unlimited buy')}
            </Text>
          </Flex>
        </Flex>

        <Flex sx={gnanaStyles.renderActions}>
          <Button onClick={handleZap}> LFG</Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default React.memo(ZapGnana)
