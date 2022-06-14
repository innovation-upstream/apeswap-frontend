/** @jsxImportSource theme-ui */
import React from 'react'
import { Select, SelectItem, Text } from '@ape.swap/uikit'
import { languageList } from 'config/localization/languages'
import { useTranslation } from 'contexts/Localization'

const LangSelector = () => {
  const { setLanguage, currentLanguage } = useTranslation()
  return (
    <Select
      size="xsm"
      active={currentLanguage?.language}
      position="top"
      onChange={(e) => setLanguage(languageList?.find((lang) => lang.language === e.target.value) || languageList?.[0])}
    >
      {languageList?.map((lang) => (
        <SelectItem key={lang.code} value={lang.language} size="xsm" sx={{ padding: '1px', textAlign: 'center' }}>
          <Text color="text">{lang.language}</Text>
        </SelectItem>
      ))}
    </Select>
  )
}

export default LangSelector
