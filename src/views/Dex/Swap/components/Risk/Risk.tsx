/** @jsxImportSource theme-ui */
import React, { useEffect, useState } from 'react'
import { Flex, Text, TooltipBubble } from '@ape.swap/uikit'
import { parsedRiskData, TOKEN_RISK, TOKEN_RISK_VALUES } from './helpers'
import { ChainId, Currency, Token } from '@ape.swap/sdk'
import { styles } from './styles'
import { useTranslation } from 'contexts/Localization'

const supportedChains = [ChainId.BSC]

const Risk = ({ chainId, currency }: { chainId: number; currency: Currency }) => {
  const isChainSupported = supportedChains.includes(chainId)
  const [risk, setRisk] = useState(null)
  const [hide, setHide] = useState(isChainSupported)
  const { t } = useTranslation()

  useEffect(() => {
    setRisk(null)
    const isToken = currency instanceof Token
    const token = currency as Token
    if (isToken && isChainSupported) {
      setHide(false)
      parsedRiskData(chainId, token?.address).then((res) => {
        setRisk(res.risk)
      })
    } else {
      setHide(true)
    }
  }, [chainId, currency, isChainSupported])

  const getTagColor = () => {
    switch (risk) {
      case TOKEN_RISK.VERY_LOW || TOKEN_RISK.LOW: {
        return '#38A611'
      }
      case TOKEN_RISK.MEDIUM: {
        return '#FFB300'
      }
      case TOKEN_RISK.HIGH || TOKEN_RISK.VERY_HIGH: {
        return '#DF4141'
      }
      default: {
        return '#A09F9C'
      }
    }
  }

  return (
    <Flex sx={styles.riskContainer}>
      {!hide && (
        <Flex sx={{ minWidth: '150px', justifyContent: 'flex-end' }}>
          <TooltipBubble
            placement="bottomRight"
            width="226px"
            style={{ padding: ' 10px' }}
            body={
              <Flex sx={{ flexWrap: 'wrap' }}>
                <Text
                  sx={{
                    ...styles.title,
                    fontWeight: 700,
                  }}
                >
                  {TOKEN_RISK_VALUES[risk] ? TOKEN_RISK_VALUES[risk] : 'Scanning ...'}
                </Text>
                <Text sx={styles.title}>
                  {t('Risk scan results are provided by a third party')}{' '}
                  <Text sx={styles.yellow}>
                    <a href="https://www.avengerdao.org/" target="_blank" rel="noreferrer noopener">
                      Avenger DAO
                    </a>
                  </Text>
                </Text>
                <Text sx={styles.title}>
                  {t(
                    'It is a tool for indicative purposes only to allow users to check the reference risk level of a BNB Chain Smart Contract. Please do your own research - interactions with any BNB Chain Smart Contract is at your own risk.',
                  )}
                </Text>
                <Text sx={styles.title}>
                  {t('Learn more about risk rating')}{' '}
                  <Text sx={styles.yellow}>
                    <a href="https://www.avengerdao.org/" target="_blank" rel="noreferrer noopener">
                      {t('here')}
                    </a>
                  </Text>
                  .
                </Text>
              </Flex>
            }
          >
            <Flex sx={{ ...styles.tag, borderColor: getTagColor() }}>
              <Text sx={{ ...styles.text, color: getTagColor() }}>
                {TOKEN_RISK_VALUES[risk] ? TOKEN_RISK_VALUES[risk] : 'Scanning ...'}
              </Text>
            </Flex>
          </TooltipBubble>
        </Flex>
      )}
    </Flex>
  )
}

export default React.memo(Risk)
