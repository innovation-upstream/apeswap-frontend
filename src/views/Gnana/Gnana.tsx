/** @jsxImportSource theme-ui */
import React, { useCallback, useState, useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { Box } from 'theme-ui'
import { Flex, Heading, Button, Text, ChevronRightIcon, Svg, Checkbox } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import { gnanaStyles } from './styles'
import { useCurrency } from 'hooks/Tokens'
import { Field } from 'state/swap/actions'
import { getFullDisplayBalance } from 'utils/formatBalance'
import useTokenBalance from 'hooks/useTokenBalance'
import { useBananaAddress, useGoldenBananaAddress } from 'hooks/useAddress'
import InputPanel from './components/InputPanel'
import { useBanana, useTreasury } from 'hooks/useContract'
import { useBuyGoldenBanana } from 'hooks/useGoldenBanana'
import { useToast } from 'state/hooks'
import useApproveTransaction from 'hooks/useApproveTransaction'
import { ethers } from 'ethers'
import UnlockButton from 'components/UnlockButton'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

const Gnana = () => {
  const { account } = useActiveWeb3React()
  const MAX_BUY = 5000
  const bananaToken = useCurrency('0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95')
  const gnanaToken = useCurrency('0xdDb3Bd8645775F59496c821E4F55A7eA6A6dc299')
  const { t } = useTranslation()
  const [unlimited, setUnlimited] = useState(false)
  const treasuryContract = useTreasury()
  const [processing, setProcessing] = useState(false)
  // BUY GNANA
  const [val, setVal] = useState('0')
  const { handleBuy } = useBuyGoldenBanana()
  const gnanaVal = parseFloat(val) > 0 ? parseFloat(val) * 0.7 : '0'
  const bananaBalance = useTokenBalance(useBananaAddress())
  const { toastSuccess } = useToast()
  const bananaContract = useBanana()
  // SELL GNANA
  const goldenBananaBalance = useTokenBalance(useGoldenBananaAddress())

  // BUY GNANA THINGS
  const fullBananaBalance = useMemo(() => {
    return Number(getFullDisplayBalance(bananaBalance)).toFixed(4)
  }, [bananaBalance])
  const handleSelectMax = useCallback(() => {
    const max = parseInt(fullBananaBalance) < MAX_BUY || unlimited ? fullBananaBalance : MAX_BUY
    setVal(max.toString())
  }, [fullBananaBalance, unlimited, setVal])
  const handleChange = useCallback(
    (val) => {
      setVal(val)
    },
    [setVal],
  )
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
    onApprove: () => {
      return bananaContract.approve(treasuryContract.address, ethers.constants.MaxUint256).then((trx) => trx.wait())
    },
    onSuccess: async () => {
      toastSuccess(t('Approved!'))
    },
  })
  const buyGnana = useCallback(async () => {
    try {
      setProcessing(true)
      await handleBuy(val)
      setProcessing(false)
    } catch (e) {
      setProcessing(false)
      console.warn(e)
    }
  }, [handleBuy, val])
  const displayMax = unlimited ? 'unlimited' : MAX_BUY

  // SELL GNANA THINGS
  const fullGnanaBalance = useMemo(() => {
    return getFullDisplayBalance(goldenBananaBalance)
  }, [goldenBananaBalance])

  const handleCheckBox = useCallback(() => {
    setUnlimited(!unlimited)
    if (unlimited) setVal('0')
  }, [unlimited, setUnlimited])

  const disabled =
    processing ||
    val === '' ||
    parseInt(val) === 0 ||
    parseInt(val) > parseInt(fullBananaBalance) ||
    (parseInt(val) > MAX_BUY && !unlimited)

  const renderActions = () => {
    if (!account) {
      return <UnlockButton fullWidth />
    }
    if (isApprovedBanana) {
      return (
        <Button variant="primary" onClick={buyGnana} disabled={disabled} fullWidth>
          {t('CONVERT')}
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
          fieldType={Field.INPUT}
          handleMaxInput={handleSelectMax}
          fullBalance={fullBananaBalance}
          disabled={false}
        />
        <Text
          sx={{
            fontSize: '12px',
            fontWeight: 500,
            color: !unlimited && parseInt(val) > MAX_BUY ? 'error' : 'text',
          }}
        >
          {t('*Current max conversion is %displayMax% BANANA', { displayMax })}
        </Text>
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
          value={gnanaVal.toString()}
          onUserInput={handleChange}
          fieldType={Field.OUTPUT}
          handleMaxInput={handleSelectMax}
          fullBalance={fullGnanaBalance}
          disabled={true}
        />

        <Flex sx={{ marginTop: '20px', alignItems: 'center' }}>
          <Flex sx={{ alignItems: 'center', width: '21px', height: '21px' }}>
            <Checkbox id="checkbox" checked={unlimited} sx={{ backgroundColor: 'white2' }} onChange={handleCheckBox} />
          </Flex>
          <Text
            sx={{
              fontSize: '12px',
              fontWeight: 500,
              marginLeft: '10px',
              color: !unlimited && parseInt(val) > MAX_BUY ? 'error' : 'text',
            }}
          >
            {t('I understand how GNANA works and I want to enable unlimited buy')}
          </Text>
        </Flex>
        <Flex
          sx={{
            position: 'relative',
            width: '100%',
            marginTop: '10px',
          }}
        >
          {renderActions()}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default React.memo(Gnana)
