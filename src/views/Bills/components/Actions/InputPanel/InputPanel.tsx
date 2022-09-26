/** @jsxImportSource theme-ui */
import { Flex, Text } from '@ape.swap/uikit'
import { Input as NumericalInput } from 'components/CurrencyInputPanel/NumericalInput'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { Spinner } from 'theme-ui'
import React, { useMemo, useState } from 'react'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { getCurrencyUsdPrice, getTokenUsdPrice } from 'utils/getTokenUsdPrice'
import { styles } from './styles'
import Dots from 'components/Loader/Dots'
import { Currency } from '@ape.swap/sdk'
import DualCurrencyDropdown from './DualCurrencyDropdown'
import { PairState, usePair } from 'hooks/usePairs'
import { TestPair } from '../Buy'

interface InputPanelProps {
  handleMaxInput: (field: any) => void
  onUserInput: (val: string) => void
  value: string
  onCurrencySelect: (currency: TestPair) => void
  inputCurrencies: Currency[]
  lpList: TestPair[]
}

const InputPanel: React.FC<InputPanelProps> = ({
  handleMaxInput,
  onUserInput,
  value,
  onCurrencySelect,
  inputCurrencies,
  lpList,
}) => {
  const [usdVal, setUsdVal] = useState(null)
  const { chainId, account } = useActiveWeb3React()
  const [pairState, pair] = usePair(inputCurrencies[0], inputCurrencies[1])
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, pair?.liquidityToken ?? inputCurrencies[0])
  const currencyBalance = selectedCurrencyBalance?.toSignificant(6)
  const { t } = useTranslation()

  useMemo(async () => {
    console.log('fetching pricess')
    setUsdVal(null)
    if (pairState === PairState.EXISTS) {
      setUsdVal(await getTokenUsdPrice(chainId, pair?.liquidityToken?.address, pair?.liquidityToken.decimals, true))
    } else {
      setUsdVal(await getCurrencyUsdPrice(chainId, inputCurrencies[0], false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, inputCurrencies[0], inputCurrencies[1], pair?.liquidityToken?.address])

  return (
    <Flex sx={styles.dexPanelContainer}>
      <Flex sx={styles.panelTopContainer}>
        <NumericalInput value={value} onUserInput={(val) => onUserInput(val)} align="left" id="bill-amount-input" />
        <DualCurrencyDropdown inputCurrencies={inputCurrencies} onCurrencySelect={onCurrencySelect} lpList={lpList} />
      </Flex>
      <Flex sx={styles.panelBottomContainer}>
        <Flex
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.4,
          }}
        >
          <Text size="12px" sx={styles.panelBottomText}>
            {!usdVal && value !== '0.0' ? (
              <Spinner width="15px" height="15px" />
            ) : value !== '0.0' && usdVal !== 0 && value ? (
              `$${(usdVal * parseFloat(value)).toFixed(2)}`
            ) : null}
          </Text>
        </Flex>
        {account && (
          <Flex sx={{ alignItems: 'center' }}>
            <Text size="12px" sx={styles.panelBottomText}>
              {t('Balance: %balance%', { balance: currencyBalance || 'loading' })}
              {!currencyBalance && <Dots />}
            </Text>
            {parseFloat(currencyBalance) > 0 && (
              <Flex sx={styles.maxButton} size="sm" onClick={handleMaxInput}>
                <Text color="primaryBright" sx={{ lineHeight: '0px' }}>
                  {t('MAX')}
                </Text>
              </Flex>
            )}
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

export default React.memo(InputPanel)
