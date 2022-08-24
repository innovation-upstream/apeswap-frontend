/** @jsxImportSource theme-ui */
import React, { useEffect, useState } from 'react'
import { Flex, Text, Box, Link } from 'theme-ui'
import { Button, useModal } from '@ape.swap/uikit'
import { DropDownIcon } from 'components/ListView/styles'
import { useTranslation } from 'contexts/Localization'
import { useBananaAddress, useGoldenBananaAddress } from 'hooks/useAddress'
import { LiquidityModal } from 'components/LiquidityWidget'
import { Field, selectCurrency } from 'state/swap/actions'
import { useAppDispatch } from 'state'
import { FarmButton } from 'views/Farms/components/styles'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { Farm } from 'state/types'
import { tokenInfo, tokenListInfo } from './tokenInfo'
import styles from './styles'
import DualLiquidityModal from '../DualLiquidityModal/DualLiquidityModal'
import { selectLP } from '../../state/zap/actions'

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
  lpApr,
  isLp,
  label,
  tokenAddress,
  quoteTokenAddress,
  apy,
  liquidityUrl,
  rewardTokenName,
  farm,
}) => {
  const [expanded, setExpanded] = useState(false)
  const [link, setLink] = useState('')
  const { chainId } = useActiveWeb3React()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const banana = useBananaAddress()
  const gnana = useGoldenBananaAddress()

  const [, closeModal] = useModal(<></>)
  const [onPresentAddLiquidityWidgetModal] = useModal(
    <DualLiquidityModal handleClose={closeModal} />,
    true,
    true,
    'liquidityWidgetModal',
  )

  useEffect(() => {
    if (!isLp) {
      if (tokenAddress?.toLowerCase() === banana.toLowerCase()) {
        setLink('swap')
      }
      if (tokenAddress?.toLowerCase() === gnana.toLowerCase()) {
        setLink('gnana')
      }
    }
  }, [chainId, tokenAddress, isLp, banana, gnana])

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
      dispatch(
        selectLP({
          outPut: {
            lpSymbol: farm.lpSymbol,
            lpAddress: farm.lpAddresses[chainId],
            lpValueUsd: farm.lpValueUsd?.toString(),
            currency1: farm.tokenAddresses[chainId],
            currency1Symbol: farm.tokenSymbol,
            currency2: farm.quoteTokenAdresses[chainId],
            currency2Symbol: farm.quoteTokenSymbol,
            userData: farm.userData,
          },
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
        <Text
          sx={{
            fontWeight: 600,
            fontSize: '14px',
            '&:hover': {
              cursor: 'pointer',
            },
          }}
        >
          {t('Details')}
        </Text>
        <DropDownIcon width="10px" open={expanded} />
      </Flex>
      <Box sx={styles.detailContainer(!expanded)}>
        <Flex sx={styles.detailRow}>
          {isLp ? (
            <Text>{t('APR (incl. LP rewards)')}</Text>
          ) : (
            <Text>
              {t('APR')} - {rewardTokenName} {t('rewards')}
            </Text>
          )}
          <Text>{(apr + (lpApr || 0)).toFixed(2)}%</Text>
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
            <FarmButton onClick={() => showLiquidity(tokenAddress, quoteTokenAddress)}>
              {t('GET')} {label}
            </FarmButton>
          )}
          {isLp && liquidityUrl && (
            <Link
              href={liquidityUrl}
              target="_blank"
              sx={{
                '&:hover': {
                  textDecoration: 'none',
                },
              }}
            >
              <Button style={{ fontSize: '16px' }}>
                {t('GET')} {label}
              </Button>
            </Link>
          )}
          {!isLp && (
            <Link
              href={link}
              target="_blank"
              sx={{
                '&:hover': {
                  textDecoration: 'none',
                },
              }}
            >
              <Button style={{ fontSize: '16px' }}>
                {t('GET')} {label}
              </Button>
            </Link>
          )}
        </Flex>
      </Box>
    </>
  )
}
export default React.memo(DetailsContent)
