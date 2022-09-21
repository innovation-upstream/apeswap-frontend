/** @jsxImportSource theme-ui */
import React, { useState } from 'react'
import { AutoRenewIcon, Flex, Text } from '@ape.swap/uikit'
import { getFullDisplayBalance } from 'utils/formatBalance'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useBuyBill from 'views/Bills/hooks/useBuyBill'
import BigNumber from 'bignumber.js'
import { useToast } from 'state/hooks'
import { getEtherscanLink } from 'utils'
import { useAppDispatch } from 'state'
import { fetchBillsUserDataAsync, fetchUserOwnedBillsDataAsync } from 'state/bills'
import { Field, selectCurrency } from 'state/swap/actions'
import { useTranslation } from 'contexts/Localization'
import { ActionProps } from './types'
import { BuyButton, GetLPButton, MaxButton, StyledInput } from './styles'
import DualLiquidityModal from 'components/DualAddLiquidity/DualLiquidityModal'
import { Svg, useModal, Text as StyledText } from '@ape.swap/uikit'
import { selectOutputCurrency } from 'state/zap/actions'
import { BillValueContainer, TextWrapper } from '../Modals/styles'

const Buy: React.FC<ActionProps> = ({
  bill,
  disabled,
  onValueChange,
  onBillId,
  onTransactionSubmited,
  value,
  safeAvailable,
}) => {
  const { userData, token, quoteToken, contractAddress, price, lpPrice, earnToken, maxTotalPayOut, totalPayoutGiven } =
    bill
  const formatUserLpValue = getFullDisplayBalance(new BigNumber(userData?.stakingTokenBalance))
  const { chainId, account } = useActiveWeb3React()
  const { onBuyBill } = useBuyBill(contractAddress[chainId], value, lpPrice, price)
  const dispatch = useAppDispatch()
  const [pendingTrx, setPendingTrx] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { t } = useTranslation()
  const bigValue = new BigNumber(value).times(new BigNumber(10).pow(18))
  const billValue = bigValue.div(new BigNumber(price))?.toString()

  const available = new BigNumber(maxTotalPayOut)
    ?.minus(new BigNumber(totalPayoutGiven))
    ?.div(new BigNumber(10).pow(earnToken.decimals))

  const handleInput = (val: string) => {
    onValueChange(val)
  }

  const searchForBillId = (resp) => {
    const billId = resp.events[6]?.args?.billId?.toString()
    const { transactionHash } = resp
    onBillId(billId, transactionHash)
  }

  const handleBuy = async () => {
    setPendingTrx(true)
    onTransactionSubmited(true)
    await onBuyBill()
      .then((resp) => {
        const trxHash = resp.transactionHash
        searchForBillId(resp)
        toastSuccess(t('Buy Successful'), {
          text: t('View Transaction'),
          url: getEtherscanLink(trxHash, 'transaction', chainId),
        })
      })
      .catch((e) => {
        console.error(e)
        toastError(e?.data?.message || t('Error: Please try again.'))
        setPendingTrx(false)
        onTransactionSubmited(false)
      })
    dispatch(fetchUserOwnedBillsDataAsync(chainId, account))
    dispatch(fetchBillsUserDataAsync(chainId, account))
    setPendingTrx(false)
  }

  const [onPresentAddLiquidityModal] = useModal(<DualLiquidityModal />, true, true, 'liquidityWidgetModal')

  const showLiquidity = () => {
    dispatch(
      selectCurrency({
        field: Field.INPUT,
        currencyId: token.symbol === 'BNB' ? 'ETH' : token.address[chainId],
      }),
    )
    dispatch(
      selectCurrency({
        field: Field.OUTPUT,
        currencyId: quoteToken.symbol === 'BNB' ? 'ETH' : quoteToken.address[chainId],
      }),
    )
    dispatch(
      selectOutputCurrency({
        currency1: token.address[chainId],
        currency2: quoteToken.address[chainId],
      }),
    )
    onPresentAddLiquidityModal()
  }

  return (
    <Flex sx={{ width: '100%', flexDirection: 'column' }}>
      <div>
        <Flex style={{ position: 'relative', height: '69px', background: 'white1' }}>
          <MaxButton size="sm" onClick={() => handleInput(formatUserLpValue)}>
            {t('Max')}
          </MaxButton>
          <StyledInput onChange={(e) => handleInput(e.target.value)} value={value} />
          <Text fontSize="12px">{t('Balance')}:</Text>
          <Text fontSize="12px" style={{ position: 'absolute', bottom: 5, right: 10, zIndex: 1, opacity: 0.8 }}>
            {formatUserLpValue?.slice(0, 15)} LP
          </Text>
        </Flex>
        {new BigNumber(userData?.allowance).gt(0) && (
          <BillValueContainer>
            <TextWrapper>
              <Text fontSize="14px" pr={1}>
                {t('Bill Value')}:{' '}
                <span style={{ fontWeight: 700 }}>
                  {billValue === 'NaN' ? '0' : parseFloat(billValue).toFixed(3)} {earnToken?.symbol}
                </span>
              </Text>
            </TextWrapper>
            <TextWrapper>
              <Text fontSize="14px">
                {t('Available')}:{' '}
                <span style={{ fontWeight: 700 }}>
                  {!available ? '0' : new BigNumber(safeAvailable).toFixed(3)} {earnToken?.symbol}
                </span>
              </Text>
            </TextWrapper>
          </BillValueContainer>
        )}
      </div>
      <div>
        <GetLPButton variant="secondary" onClick={showLiquidity}>
          <StyledText sx={{ marginRight: '5px' }}>{t('Get LP')}</StyledText>
          <Svg icon="ZapIcon" color="yellow" />
        </GetLPButton>
        <BuyButton
          onClick={handleBuy}
          endIcon={pendingTrx && <AutoRenewIcon spin color="currentColor" />}
          disabled={disabled || parseFloat(formatUserLpValue) < parseFloat(value) || pendingTrx}
        >
          {t('Buy')}
        </BuyButton>
      </div>
    </Flex>
  )
}

export default React.memo(Buy)
