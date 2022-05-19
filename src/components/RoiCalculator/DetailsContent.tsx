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
          <Text>{t('APR (incl. LP rewards)')}</Text>
          <Text>{props?.aprRewards}%</Text>
        </Flex>
        <Flex sx={styles.detailRow}>
          <Text>{t('Base APR (BANANA yield only)')}</Text>
          <Text>{props?.apr}%</Text>
        </Flex>
        <Flex sx={styles.detailRow}>
          <Text>{t('APY (1x daily compound)')}</Text>
          <Text>{props?.detailApy}%</Text>
        </Flex>
        <Flex sx={styles.detailRow}>
          <Text>{t('Farm Multiplier')}</Text>
          <Text>{props?.multiplier}</Text>
        </Flex>

        <ul>
          <li>
            <Text sx={styles?.text}>{t('Calculated based on current rates.')}</Text>
          </li>
          <li>
            <Text sx={styles?.text}>
              {t('LP rewards: 0.17% trading fees, distributed proportionally among LP token holders.')}
            </Text>
          </li>
          <li>
            <Text sx={styles?.text}>
              {t(
                'All figures are estimates provided for your convenience only, and by no means represent guaranteed returns.',
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
