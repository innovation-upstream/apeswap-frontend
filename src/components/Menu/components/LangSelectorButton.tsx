import React from 'react'
import { useLanguageModal } from '@ape.swap/uikit'
import { Flex } from 'theme-ui'
import { languageList } from 'config/localization/languages'
import { useTranslation } from 'contexts/Localization'
import { LanguageIcon } from '../../Icons'

const LangSelectorButton = () => {
  const { setLanguage, currentLanguage, t } = useTranslation()
  const { onPresentLanguageModal } = useLanguageModal(currentLanguage?.language, languageList, setLanguage, t)
  return (
    <Flex sx={{ padding: '0px 15px' }}>
      <LanguageIcon width="30px" cursor="pointer" onClick={onPresentLanguageModal} />
    </Flex>
  )
}

export default React.memo(LangSelectorButton)
