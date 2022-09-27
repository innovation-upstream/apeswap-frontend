/** @jsxImportSource theme-ui */
import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { Text, Flex, Checkbox, Button } from '@ape.swap/uikit'
import { MP } from './types'
import { circular } from './styles'
import { useIsModalShown, useFlagModal } from 'state/user/hooks'
import { MODAL_TYPE } from 'config/constants'

const CircularModal: React.FC<MP> = ({ actionType, description, supporting, children }) => {
  const { t } = useTranslation()
  const { buying, selling, poolHarvest, generalHarvest } = useIsModalShown()
  const values =
    (actionType === MODAL_TYPE.BUYING && buying) ||
    (actionType === MODAL_TYPE.SELLING && selling) ||
    (actionType === MODAL_TYPE.POOL_HARVEST && poolHarvest) ||
    (actionType === MODAL_TYPE.GENERAL_HARVEST && generalHarvest)
  const [setFlagModal] = useFlagModal(actionType, values)

  return (
    <Flex sx={circular.container}>
      <Text sx={circular.supporting}>{t(`${supporting}`)}</Text>
      <Text sx={circular.description}>{t(`${description}`)}</Text>

      {children}

      <Flex sx={circular.footer}>
        <Button
          variant="secondary"
          sx={{ width: ['100%', '188px'] }}
          onClick={() =>
            window.open(
              'https://apeswap.gitbook.io/apeswap-finance/welcome/apeswap-tokens/banana#what-can-i-do-with-banana',
              '_blank',
            )
          }
        >
          {t('Learn More')}
        </Button>
        <Flex sx={circular.checkSection}>
          <Flex sx={circular.checkboxParent}>
            <Checkbox
              id="checkbox"
              checked={values ? false : true}
              sx={{ backgroundColor: 'white2' }}
              onChange={setFlagModal}
            />
          </Flex>
          <Text sx={circular.checkboxText}>{t("Don't show this again")}</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default CircularModal
