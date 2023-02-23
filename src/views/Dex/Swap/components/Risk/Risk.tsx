/** @jsxImportSource theme-ui */
import React, { useEffect, useState } from 'react'
import { Flex, HelpIcon, Text, TooltipBubble } from '@ape.swap/uikit'
import { parsedRiskData, TOKEN_RISK } from './handler'
import { Currency, Token } from '@ape.swap/sdk'
import { styles } from './styles'

const Risk = ({ chainId, currency }: { chainId: number; currency: Currency }) => {
  const [risk, setRisk] = useState(null)
  const [isNative, setIsNative] = useState(false)

  useEffect(() => {
    setRisk(null)
    const isToken = currency instanceof Token
    const token = currency as Token
    if (isToken) {
      setIsNative(false)
      parsedRiskData(chainId, token.address).then((res) => {
        console.log(res)
        setRisk(res.risk)
      })
    } else {
      setIsNative(true)
    }
  }, [chainId, currency])

  const TOKEN_RISK_VALUES = {
    [TOKEN_RISK.VERY_LOW]: 'Very Low Risk',
    [TOKEN_RISK.LOW]: 'Low Risk',
    [TOKEN_RISK.MEDIUM]: 'Medium Risk',
    [TOKEN_RISK.HIGH]: 'High Risk',
    [TOKEN_RISK.VERY_HIGH]: 'Very High Risk',
  } as const

  console.log(risk)
  console.log(TOKEN_RISK_VALUES[risk])
  console.log(typeof TOKEN_RISK_VALUES[risk])

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
    <Flex sx={{ position: 'relative', width: '0', justifyContent: 'flex-end', alignItems: 'flex-end', height: '100%' }}>
      {!isNative && (
        <Flex sx={{ minWidth: '150px', justifyContent: 'flex-end' }}>
          <TooltipBubble placement="bottomRight" transformTip="" body={<Flex>asd</Flex>} width="180px">
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
