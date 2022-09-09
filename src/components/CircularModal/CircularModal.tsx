/** @jsxImportSource theme-ui */
import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { Text, Flex, Checkbox, Button } from '@ape.swap/uikit'
import { MP } from './types'
import { circular } from './styles'

const CircularModal: React.FC<MP> = ({ actionType, description, supporting, children }) => {
  const { t } = useTranslation()
  const siblings = children as React.ReactNode[]

  const renderChildren = () => {
    return children && siblings.map((element, index) => <>{element}</>)
  }

  return (
    <Flex sx={circular.container}>
      <Text sx={circular.supporting}>{supporting}</Text>
      <Text sx={circular.description}>{description}</Text>

      {renderChildren()}

      <Flex sx={circular.footer}>
        <Button variant="secondary" sx={{ width: ['100%', '188px'] }} onClick={null}>
          Learn More
        </Button>
        <Flex sx={circular.checkSection}>
          <Flex sx={circular.checkboxParent}>
            <Checkbox id="checkbox" checked={false} sx={{ backgroundColor: 'white2' }} onChange={null} />
          </Flex>
          <Text sx={circular.checkboxText}>{t("Don't show this again")}</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default CircularModal
