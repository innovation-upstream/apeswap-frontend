/** @jsxImportSource theme-ui */
import { Button, Card, CardIcon, CogIcon, Flex, Svg, Text, useModal } from '@ape.swap/uikit'
import { Currency } from '@apeswapfinance/sdk'
import NumericalInput from 'components/LiquidityWidget/CurrencyInput/NumericalInput'
import { CurrencyLogo } from 'components/Logo'
import CurrencySearchModal from 'components/SearchModal/CurrencySearchModal'
import UnlockButton from 'components/UnlockButton'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { ApprovalState, useApproveCallbackFromTrade } from 'hooks/useApproveCallback'
import { WrapType } from 'hooks/useWrapCallback'
import React, { useCallback, useState } from 'react'
import { useUserSlippageTolerance } from 'state/user/hooks'
import { computeTradePriceBreakdown, warningSeverity } from 'utils/prices'
import TokenSelector from '../TokenSelector'
import { styles } from './styles'
import { DexActionProps } from './types'

const DexActions: React.FC<DexActionProps> = ({ trade, swapInputError, isExpertMode, showWrap, wrapType, onWrap }) => {
  const { t } = useTranslation()
  const { account } = useActiveWeb3React()
  const [approvalSubmitted, setApprovalSubmitted] = useState(false)

  // get custom setting values for user
  const [allowedSlippage] = useUserSlippageTolerance()

  // check whether the user has approved the router on the input token
  const [approval, approveCallback] = useApproveCallbackFromTrade(trade, allowedSlippage)

  const { priceImpactWithoutFee } = computeTradePriceBreakdown(trade)

  // warnings on slippage
  const priceImpactSeverity = warningSeverity(priceImpactWithoutFee)

  // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // never show if price impact is above threshold in non expert mode
  const showApproveFlow =
    !swapInputError &&
    (approval === ApprovalState.NOT_APPROVED ||
      approval === ApprovalState.PENDING ||
      (approvalSubmitted && approval === ApprovalState.APPROVED)) &&
    !(priceImpactSeverity > 3 && !isExpertMode)

  const renderAction = () => {
    if (!account) {
      return <UnlockButton fullWidth />
    }
    if (showWrap) {
      return (
        <Button fullWidth onClick={onWrap}>
          {wrapType === WrapType.WRAP ? t('Wrap') : t('Unwrap')}
        </Button>
      )
    }
    return <></>
  }

  return <Flex sx={{ ...styles.dexActionsContainer }}>{renderAction()}</Flex>
}

export default React.memo(DexActions)
