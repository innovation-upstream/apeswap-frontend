/** @jsxImportSource theme-ui */
import React, { useEffect, useState } from 'react'
import { Flex, Text } from '@ape.swap/uikit'
import handler from './handler'
import { Currency, Token } from '@ape.swap/sdk'

const Risk = ({ chainId, currency }: { chainId: number; currency: Currency }) => {
  const [risk, setRisk] = useState('')

  useEffect(() => {
    console.log(currency instanceof Token)
    const isToken = currency instanceof Token
    const token = currency as Token
    if (isToken) {
      handler(chainId, token.address).then((res) => {
        console.log(res)
        setRisk(res)
      })
    }
  }, [chainId, currency])

  console.log(risk)
  return (
    <Flex sx={{ width: '90px', justifyContent: 'flex-end', alignItems: 'flex-end', marginBottom: '5px' }}>
      <Flex
        sx={{
          height: '19px',
          borderRadius: '70px',
          padding: '0 5px',
          border: '2px solid #38A611',
          alignItems: 'center',
        }}
      >
        <Text sx={{ fontSize: '12px', fontWeight: 700, lineHeight: '15px' }}>LOW RISK</Text>
      </Flex>
    </Flex>
  )
}

export default React.memo(Risk)
