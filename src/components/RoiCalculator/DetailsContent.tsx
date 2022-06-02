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
import { tokenInfo, tokenListInfo } from './tokenInfo'
import styles from './styles'

interface expandCardProps {
  [key: string]: any
}

const DetailsContent: React.FC<expandCardProps> = ({ ...props }) => {
  const [expanded, setExpanded] = useState(true)
  const isMobile = useIsMobile()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const apr: number = props?.apr + (props?.lpApr || 0)
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
          <Text>{t(props?.lpApr ? 'APR (incl. LP rewards)' : `APR - ${props?.lpLabel} rewards`)}</Text>
          <Text>{apr.toFixed(2)}%</Text>
        </Flex>
        {/* Conditional Render Start */}
        {props.lpApr &&
          tokenInfo.map((item) => {
            return (
              <Flex key={item.value} sx={styles.detailRow}>
                <Text>{t(`${item.text}`)}</Text>
                <Text>{props[item.value]}%</Text>
              </Flex>
            )
          })}
        {/* Conditional Render Stop */}

        <ul>
          {tokenListInfo[props?.lpApr ? 'lpPair' : 'notLpPair']?.map((item) => (
            <li key={item}>
              <Text sx={styles?.text} dangerouslySetInnerHTML={{ __html: t(item) }} />
            </li>
          ))}
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
