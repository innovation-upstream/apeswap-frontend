/** @jsxImportSource theme-ui */
import React from 'react'
import { CalculateIcon, useModal } from '@apeswapfinance/uikit'
import { IconButton } from '@ape.swap/uikit'
import RoiCalculatorModal from './RoiCalculatorModal'
import styles from './styles'

export interface ApyButtonProps {
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
  tokenAddress?: string
  quoteTokenAddress?: string
}

const ApyButton: React.FC<ApyButtonProps> = ({
  lpLabel,
  rewardTokenPrice,
  apy,
  addLiquidityUrl,
  rewardTokenName,
  apr,
  lpApr,
  multiplier,
  detailApy,
  lpAddresses,
  tokenAddress,
  quoteTokenAddress,
}) => {
  const [onPresentApyModal] = useModal(
    <RoiCalculatorModal
      lpLabel={lpLabel}
      rewardTokenName={rewardTokenName}
      rewardTokenPrice={rewardTokenPrice}
      apy={apy}
      addLiquidityUrl={addLiquidityUrl}
      apr={apr}
      lpApr={lpApr}
      multiplier={multiplier}
      detailApy={detailApy}
      lpAddresses={lpAddresses}
      tokenAddress={tokenAddress}
      quoteTokenAddress={quoteTokenAddress}
    />,
  )

  return (
    <IconButton variant="transparent" onClick={onPresentApyModal} disabled={!apr} sx={styles.apyButton}>
      <CalculateIcon color="yellow" ml="3px" />
    </IconButton>
  )
}

export default ApyButton
