/** @jsxImportSource theme-ui */
import React from 'react'
import { styles } from '../../../views/Bills/components/BillsListView/styles'
import { Select, SelectItem, Text } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import { Option } from './types'

interface FilterSelectProps {
  selectedOption: string
  setOption: (option: string) => void
  options: Option[]
}

const MenuSelect: React.FC<FilterSelectProps> = ({ selectedOption, setOption, options }) => {
  const { t } = useTranslation()
  return (
    <Select size="xsm" onChange={(e) => setOption(e.target.value)} active={selectedOption} sx={styles.select}>
      {options.map((option) => {
        return (
          <SelectItem size="xsm" value={option.value} key={option.label}>
            <Text>{t(option.label)}</Text>
          </SelectItem>
        )
      })}
    </Select>
  )
}

export default MenuSelect
