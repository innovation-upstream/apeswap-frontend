/** @jsxImportSource theme-ui */
import React from 'react'
import { Box } from 'theme-ui'
import { Input } from '@ape.swap/uikit'
import { styles } from './styles'

export interface InputProps {
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  placeholder?: string
  value: string
}

const InputCreateProposal: React.FC<InputProps> = ({ onChange, placeholder, value }) => {
  return (
    <Box sx={styles.inputMain}>
      <Input sx={styles.input} placeholder={placeholder} value={value} onChange={onChange} width="100%" />
    </Box>
  )
}

export default InputCreateProposal
