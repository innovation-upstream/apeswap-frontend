/** @jsxImportSource theme-ui */
import { Flex, Text } from '@ape.swap/uikit'
import { Currency, Percent, Price } from '@apeswapfinance/sdk'
import { ONE_BIPS } from 'config/constants'
import { useTranslation } from 'contexts/Localization'
import React from 'react'
import { Field } from 'state/mint/actions'
import { styles } from './styles'

const PoolInfo: React.FC<{
  currencies: { [field in Field]?: Currency }
  noLiquidity?: boolean
  poolTokenPercentage?: Percent
  price?: Price
  chainId?: number
}> = ({ currencies, noLiquidity, poolTokenPercentage, price, chainId }) => {
  const { t } = useTranslation()
  return (
    <Flex sx={{ ...styles.poolInfoContainer }}>
      <Flex sx={{ justifyContent: 'space-between' }}>
        <Text size="12px" weight="light">
          {t('Share of Pool')}
        </Text>
        <Text size="12px" weight={700}>
          {noLiquidity && price
            ? '100'
            : (poolTokenPercentage?.lessThan(ONE_BIPS) ? '<0.01' : poolTokenPercentage?.toFixed(2)) ?? '0'}
          %
        </Text>
      </Flex>
      <Flex sx={{ justifyContent: 'space-between' }}>
        <Text size="12px" weight="light">
          {t('%currencyA% per %currencyB%', {
            currencyA: currencies[Field.CURRENCY_A]?.getSymbol(chainId) || '',
            currencyB: currencies[Field.CURRENCY_B]?.getSymbol(chainId) || '',
          })}
        </Text>
        <Text size="12px" weight={700}>
          {price?.invert()?.toSignificant(6) ?? '-'}
        </Text>
      </Flex>
      <Flex sx={{ justifyContent: 'space-between' }}>
        <Text size="12px" weight="light">
          {t('%currencyB% per %currencyA%', {
            currencyB: currencies[Field.CURRENCY_B]?.getSymbol(chainId) || '',
            currencyA: currencies[Field.CURRENCY_A]?.getSymbol(chainId) || '',
          })}
        </Text>
        <Text size="12px" weight={700}>
          {price?.toSignificant(6) ?? '-'}
        </Text>
      </Flex>
    </Flex>
  )
}

export default React.memo(PoolInfo)
