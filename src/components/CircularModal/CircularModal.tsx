/** @jsxImportSource theme-ui */
import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { Text, Flex, Checkbox, Button } from '@ape.swap/uikit'
import { MP } from './types'
import { circular } from './styles'
import { useIsModalShown, useToggleModal } from 'state/user/hooks'

const CircularModal: React.FC<MP> = ({ actionType, description, supporting, children }) => {
  const { t } = useTranslation()
  const { buying, selling, poolHarvest, generalHarvest } = useIsModalShown()
  const values =
    (actionType === 'buying' && buying) ||
    (actionType === 'selling' && selling) ||
    (actionType === 'poolHarvest' && poolHarvest) ||
    (actionType === 'generalHarvest' && generalHarvest)
  const [setToggleModal] = useToggleModal(actionType, values)

  return (
    <Flex sx={circular.container}>
      <Text sx={circular.supporting}>{supporting}</Text>
      <Text sx={circular.description}>{description}</Text>

      {children}

      <Flex sx={circular.footer}>
        <Button variant="secondary" sx={{ width: ['100%', '188px'] }} onClick={null}>
          Learn More
        </Button>
        <Flex sx={circular.checkSection}>
          <Flex sx={circular.checkboxParent}>
            <Checkbox
              id="checkbox"
              checked={values ? false : true}
              sx={{ backgroundColor: 'white2' }}
              onChange={setToggleModal}
            />
          </Flex>
          <Text sx={circular.checkboxText}>{t("Don't show this again")}</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default CircularModal
