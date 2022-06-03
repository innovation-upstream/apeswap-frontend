/** @jsxImportSource theme-ui */
import React from 'react'
import { Select, SelectItem, Text } from '@ape.swap/uikit'

const LangSelector = ({ currentLang, langs, setLang }) => (
  <Select
    size="xsm"
    active={currentLang}
    position="top"
    onChange={(e) => setLang(langs?.find((lang) => lang.language === e.target.value) || langs[0])}
  >
    {langs?.map((lang) => (
      <SelectItem key={lang.code} value={lang.language} size="xsm" sx={{ padding: '1px', textAlign: 'center' }}>
        <Text color="text">{lang.language}</Text>
      </SelectItem>
    ))}
  </Select>
)

export default React.memo(LangSelector, (prev, next) => prev.currentLang === next.currentLang)
