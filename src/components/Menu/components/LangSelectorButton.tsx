import React from 'react'
import { useLanguageModal } from '@ape.swap/uikit'
import { Flex } from 'theme-ui'
import { LanguageIcon } from '../../Icons'

const LangSelectorButton = ({ currentLang, langs, setLang, t }) => {
  const { onPresentLanguageModal } = useLanguageModal(currentLang, langs, setLang, t)
  return (
    <Flex sx={{ padding: '0px 15px' }}>
      <LanguageIcon width="30px" cursor="pointer" onClick={onPresentLanguageModal} />
    </Flex>
  )
}

export default React.memo(LangSelectorButton)
