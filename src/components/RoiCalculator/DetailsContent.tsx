import React, { useState } from 'react'
import { Flex, Text, Box } from 'theme-ui'
import { Button } from '@ape.swap/uikit'
import { DropDownIcon } from 'components/ListView/styles'
import useIsMobile from 'hooks/useIsMobile'
import { useTranslation } from 'contexts/Localization'
import { useModal } from '@apeswapfinance/uikit'
import { LiquidityModal } from 'components/LiquidityWidget'
import { Field, selectCurrency } from 'state/swap/actions'
import { useAppDispatch } from 'state'
import styles from './styles'
import DETAILS_TOKEN_INFO from './detailsTokenInfo.json'

interface expandCardProps {
  [key: string]: any
}

const DetailsContent: React.FC<expandCardProps> = ({ ...props }) => {
  const [expanded, setExpanded] = useState(true)
  const isMobile = useIsMobile()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const [onPresentAddLiquidityWidgetModal] = useModal(<LiquidityModal />, true, true, 'liquidityWidgetModal')

  const showLiquidity = () => {
    dispatch(
      selectCurrency({
        field: Field.INPUT,
        currencyId: props?.tokenAddress,
      }),
    )
    dispatch(
      selectCurrency({
        field: Field.OUTPUT,
        currencyId: props?.quoteTokenAddress,
      }),
    )
    onPresentAddLiquidityWidgetModal()
  }

  return (
    <>
      <Flex sx={{ justifyContent: 'center', alignItems: 'center', columnGap: '10px', marginBottom: '15px' }}>
        <Text sx={{ fontWeight: 700 }}>{t('Details')}</Text>
        <DropDownIcon onClick={() => setExpanded((prev) => !prev)} open={expanded} />
      </Flex>
      <Box sx={styles.detailContainer(!expanded)}>
        <Flex sx={styles.detailRow}>
          <Text>{props.lpApr ? t('APR (incl. LP rewards)') : t(`${props.lpLabel}`)}</Text>
          <Text>{props?.aprRewards}%</Text>
        </Flex>

        {props.lpApr &&
          DETAILS_TOKEN_INFO.map((item) => {
            return (
              <Flex sx={styles.detailRow}>
                <Text>{t(`${item.text}`)}</Text>
                <Text>{props[item.value]}%</Text>
              </Flex>
            )
          })}

        <ul>
          <li>
            <Text sx={styles?.text}>{t('Calculated based on current rates.')}</Text>
          </li>
          {props.lpApr && (
            <li>
              <Text sx={styles?.text}>
                {t('LP rewards: 0.17% trading fees, distributed proportionally among LP token holders.')}
              </Text>
            </li>
          )}
          <li>
            <Text sx={styles?.text}>
              {t(
                'All figures are estimates for illustrative purposes only, and do not represent guaranteed returns. Your actual returns may vary.',
              )}
            </Text>
          </li>
        </ul>

        <Flex sx={{ marginTop: '25px', justifyContent: 'center' }}>
          <Button size={isMobile ? 'sm' : 'md'} onClick={showLiquidity}>
            {t(`GET ${props?.lpLabel}`)}
          </Button>
        </Flex>
      </Box>
    </>
  )
}
export default DetailsContent
