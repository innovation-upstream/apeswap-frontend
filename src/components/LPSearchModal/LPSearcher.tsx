/** @jsxImportSource theme-ui */
import React, { useMemo, useState } from 'react'
import { Flex, Input } from '@ape.swap/uikit'
import styled from '@emotion/styled'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useTranslation } from 'contexts/Localization'
import { useFarms } from '../../state/farms/hooks'
import { Box } from 'theme-ui'
import { useJungleFarms, usePollJungleFarms, useSetJungleFarms } from '../../state/jungleFarms/hooks'
import { useBlock } from '../../state/block/hooks'
import { ParsedFarm } from '../DualLiquidityModal/types'
import DisplayRows from './components/DisplayRows'

interface LPSearcherProps {
  onLpSelect: (farm: ParsedFarm) => void
}

function LPSearcher({ onLpSelect }: LPSearcherProps) {
  useSetJungleFarms()
  usePollJungleFarms()
  const { account, chainId } = useActiveWeb3React()
  const { t } = useTranslation()
  const farms = useFarms(account)
  const jungleFarms = useJungleFarms(account)
  const { currentBlock } = useBlock()

  const [query, setQuery] = useState('')

  const queriedFarms = useMemo(() => {
    const activeFarms = farms.filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X')

    const parsedFarms: ParsedFarm[] = activeFarms.map((farm) => {
      return {
        lpSymbol: farm.lpSymbol,
        lpAddress: farm.lpAddresses[chainId],
        lpValueUsd: farm.lpValueUsd?.toString(),
        tokenAddress: farm.tokenAddresses[chainId],
        tokenSymbol: farm.tokenSymbol,
        quoteTokenAddress: farm.quoteTokenAdresses[chainId],
        quoteTokenSymbol: farm.quoteTokenSymbol,
        userData: farm.userData,
      }
    })

    const currJungleFarms = jungleFarms.map((farm) => {
      return { ...farm, isFinished: farm.isFinished || currentBlock > farm.endBlock }
    })

    const activeJungleFarms = currJungleFarms.filter((farm) => {
      return !farm.isFinished
    })

    const parsedJungleFarms: ParsedFarm[] = activeJungleFarms.map((farm) => {
      return {
        lpSymbol: farm.tokenName,
        lpAddress: farm.contractAddress[chainId],
        lpValueUsd: '0',
        tokenAddress: farm.lpTokens.token.address[chainId],
        tokenSymbol: farm.lpTokens.token.symbol,
        quoteTokenAddress: farm.lpTokens.quoteToken.address[chainId],
        quoteTokenSymbol: farm.lpTokens.quoteToken.symbol,
        userData: {
          allowance: farm.userData?.allowance,
          tokenBalance: farm.userData?.stakingTokenBalance,
          stakedBalance: farm.userData?.stakedBalance,
          earnings: farm.userData?.pendingReward,
        },
      }
    })
    const allFarms = [...parsedFarms, ...parsedJungleFarms]

    return allFarms.filter((farm) => {
      return farm.lpSymbol.toUpperCase().includes(query.toUpperCase())
    })
  }, [chainId, currentBlock, farms, jungleFarms, query])

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  return (
    <Flex sx={{ flexDirection: 'column' }}>
      <Flex sx={{ position: 'relative', margin: '10px 0px 15px 0px' }}>
        <StyledInput
          id="token-search-input"
          placeholder={t('Name or Address')}
          autoComplete="off"
          value={query}
          onChange={handleChangeQuery}
          icon="search"
          autoFocus
        />
      </Flex>
      <Box sx={{ height: '300px', overflow: 'auto', background: 'white3', borderRadius: '10px' }}>
        <DisplayRows queriedFarms={queriedFarms} onLpSelect={onLpSelect} />
      </Box>
    </Flex>
  )
}

const StyledInput = styled(Input)`
  width: 420px;
  max-width: 100% !important;
  height: 40px;
  border-radius: 10px;
  border: none;
  background-color: ${({ theme }) => theme.colors.white3};
  color: ${({ theme }) => theme.colors.text};
  placeholder-color: ${({ theme }) => theme.colors.gray};
  ::placeholder {
    color: ${(props) => props.theme.colors.text};
  }
  :focus {
    box-shadow: none !important;
  }
`

export default React.memo(LPSearcher)
