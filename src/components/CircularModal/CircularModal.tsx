import React from 'react'
import { MP } from './types'

const CircularModal: React.FC<MP> = ({ description, actionType, children }) => {
  const siblings = children as React.ReactNode[]

  const renderChildren = () => {
    return children && siblings.map((element, index) => <>{element}</>)
  }

  return (
    <div>
      <p>{description}</p>
      {renderChildren()}
    </div>
  )
}

export default CircularModal
