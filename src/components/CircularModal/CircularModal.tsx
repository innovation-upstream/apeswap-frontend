/** @jsxImportSource theme-ui */
import React from 'react'
import { Text, Flex } from '@ape.swap/uikit'
import { MP } from './types'
import { circular } from './styles'

const CircularModal: React.FC<MP> = ({ actionType, description, supporting, children }) => {
  const siblings = children as React.ReactNode[]

  const renderChildren = () => {
    return children && siblings.map((element, index) => <>{element}</>)
  }

  return (
    <Flex sx={circular.container}>
      <Text sx={circular.supporting}>{supporting}</Text>
      <Text sx={circular.description}>{description}</Text>
      {renderChildren()}
    </Flex>
  )
}

export default CircularModal
