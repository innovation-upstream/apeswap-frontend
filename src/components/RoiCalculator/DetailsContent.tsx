import React, { useEffect, useState } from 'react'
import { Flex, Text, Box, Link } from 'theme-ui'
import { Button } from '@ape.swap/uikit'
import { DropDownIcon } from 'components/ListView/styles'
import { useTranslation } from 'contexts/Localization'
import { useModal } from '@apeswapfinance/uikit'
import { LiquidityModal } from 'components/LiquidityWidget'
import { Field, selectCurrency } from 'state/swap/actions'
import { useAppDispatch } from 'state'
import tokens from 'config/constants/tokens'
import { tokenInfo, tokenListInfo } from './tokenInfo'
import styles from './styles'
import { FarmButton } from '../../views/Farms/components/styles'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { Farm } from '../../state/types'

interface DetailsContentProps {
  onDismiss?: () => void
  label?: string
  rewardTokenName?: string
  rewardTokenPrice?: number
  apr?: number
  lpApr?: number
  apy?: number
  lpAddress?: string
  tokenAddress?: string
  quoteTokenAddress?: string
  isLp?: boolean
  farm?: Farm
  liquidityUrl?: string
}

const DetailsContent: React.FC<DetailsContentProps> = ({
  apr,
  isLp,
  label,
  tokenAddress,
  quoteTokenAddress,
  apy,
  liquidityUrl,
}) => {
  const [expanded, setExpanded] = useState(false)
  const [link, setLink] = useState('')
  const { chainId } = useActiveWeb3React()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const [onPresentAddLiquidityWidgetModal] = useModal(<LiquidityModal />, true, true, 'liquidityWidgetModal')

  useEffect(() => {
    if (!isLp) {
      if (tokenAddress?.toLowerCase() === tokens.banana.address[chainId].toLowerCase()) {
        setLink('swap')
      }
      if (tokenAddress?.toLowerCase() === tokens.gnana.address[chainId].toLowerCase()) {
        setLink('gnana')
      }
    }
  }, [chainId, tokenAddress, isLp])

  const showLiquidity = (token?, quoteToken?) => {
    if (isLp) {
      dispatch(
        selectCurrency({
          field: Field.INPUT,
          currencyId: token,
        }),
      )
      dispatch(
        selectCurrency({
          field: Field.OUTPUT,
          currencyId: quoteToken,
        }),
      )
      onPresentAddLiquidityWidgetModal()
    }
  }

  return (
    <>
      <Flex
        sx={{ justifyContent: 'center', alignItems: 'center', columnGap: '10px', marginBottom: '15px' }}
        onClick={() => setExpanded((prev) => !prev)}
      >
        <Text sx={{ fontWeight: 600, fontSize: '14px' }}>{t('Details')}</Text>
        <DropDownIcon width="10px" open={expanded} />
      </Flex>
      <Box sx={styles.detailContainer(!expanded)}>
        <Flex sx={styles.detailRow}>
          <Text>{t(isLp ? 'APR (incl. LP rewards)' : `APR - ${label} rewards`)}</Text>
          <Text>{apr.toFixed(2)}%</Text>
        </Flex>

        {isLp &&
          tokenInfo.map((item) => {
            return (
              <Flex key={item.value} sx={styles.detailRow}>
                <Text>{t(`${item.text}`)}</Text>
                <Text>{item.value === 'apr' ? apr.toFixed(2) : apy.toFixed(2)}%</Text>
              </Flex>
            )
          })}

        <ul>
          {tokenListInfo[isLp ? 'lpPair' : 'notLpPair']?.map((item) => (
            <li key={item}>
              <Text sx={styles?.text} dangerouslySetInnerHTML={{ __html: t(item) }} />
            </li>
          ))}
        </ul>

        <Flex sx={{ marginTop: '25px', justifyContent: 'center' }}>
          {isLp && !liquidityUrl && (
            <FarmButton onClick={() => showLiquidity(tokenAddress, quoteTokenAddress)}>{t(`GET ${label}`)}</FarmButton>
          )}
          {isLp && liquidityUrl && (
            <Link
              href={liquidityUrl}
              sx={{
                '&:hover': {
                  textDecoration: 'none',
                },
              }}
            >
              <Button style={{ fontSize: '16px' }}>{t(`GET ${label}`)}</Button>
            </Link>
          )}
          {!isLp && (
            <Link
              href={link}
              sx={{
                '&:hover': {
                  textDecoration: 'none',
                },
              }}
            >
              <Button style={{ fontSize: '16px' }}>{t(`GET ${label}`)}</Button>
            </Link>
          )}
        </Flex>
      </Box>
    </>
  )
}
export default DetailsContent
