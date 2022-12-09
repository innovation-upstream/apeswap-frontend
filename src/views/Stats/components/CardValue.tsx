import React, { useEffect, useRef } from 'react'
import { useCountUp } from 'react-countup'
import { Text } from '@apeswapfinance/uikit'

interface CardValueProps {
  value: number
  decimals?: number
  fontSize?: string
  prefix?: string
  suffix?: string
  fontFamily?: string
  fontWeight?: number
  color?: string
  width?: string
  maxWidth?: string
}

const getDecimals = (value: number) => {
  if (value === 0 || value > 1e5) return 0
  if (value < 1) return 4
  return 2
}
const CardValue: React.FC<CardValueProps> = ({
  value,
  decimals,
  fontSize = '40px',
  prefix,
  suffix,
  fontFamily,
  fontWeight,
  color,
  width,
  maxWidth,
}) => {
  const decimalsFromValue = getDecimals(value)

  const { countUp, update } = useCountUp({
    start: 0,
    end: value,
    duration: 1,
    separator: ',',
    decimals: decimals || decimalsFromValue,
  })

  const updateValue = useRef(update)

  useEffect(() => {
    updateValue.current(value)
  }, [value, updateValue])

  return (
    <Text
      fontFamily={fontFamily}
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      style={{ width: `${width}`, maxWidth: `${maxWidth}` }}
    >
      {prefix}
      {countUp} {suffix}
    </Text>
  )
}

export default CardValue
