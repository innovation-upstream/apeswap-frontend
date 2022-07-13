import React from 'react'
import styled from 'styled-components'
import { Flex } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import { escapeRegExp } from '../../utils'

const StyledInput = styled.input<{
  error?: boolean
  fontSize?: string
  align?: string
  width?: string
  fontWeight?: number
  marginRight: string
  removeLiquidity: boolean
}>`
  color: ${({ error, theme }) => (error ? theme.colors.error : theme.colors.text)};
  width: ${({ width }) => (width === 'full' ? 'initial' : 0)};
  height: 100%;
  position: relative;
  font-weight: 500;
  outline: none;
  border: none;
  outline: none;
  flex: 1 1 auto;
  background-color: transparent;
  font-size: ${({ fontSize }) => fontSize || '16px'};
  text-align: ${({ align }) => align && align};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  content: '%';
  padding: 0px;
  margin-left: ${({ align, width }) => (align === 'left' || width === 'full' ? '20px' : '0px')};
  margin-right: ${({ marginRight }) => marginRight}
  -webkit-appearance: textfield;
  
  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  [type='number'] {
    -moz-appearance: textfield;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme.colors.text};
  }
  ::after {
    content: '%';
  }
  :disabled {
    opacity: 0.5;
  }
`

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group

export const Input = React.memo(function InnerInput({
  value,
  onUserInput,
  placeholder,
  removeLiquidity,
  ...rest
}: {
  value: string | number
  onUserInput: (input: string) => void
  removeLiquidity?: boolean
  error?: boolean
  fontSize?: string
  align?: 'right' | 'left'
  width?: 'default' | 'full'
  fontWeight?: number
} & Omit<React.HTMLProps<HTMLInputElement>, 'ref' | 'onChange' | 'as'>) {
  const { t } = useTranslation()
  const enforcer = (nextUserInput: string) => {
    if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
      onUserInput(nextUserInput)
    }
  }

  return (
    <Flex>
      <StyledInput
        {...rest}
        value={value}
        onChange={(event) => {
          // replace commas with periods, because we exclusively uses period as the decimal separator
          enforcer(event.target.value.replace(/,/g, '.'))
          enforcer(event.target.value.replace(/%/g, ''))
        }}
        // universal input options
        inputMode="decimal"
        title={t('Token Amount')}
        autoComplete="off"
        autoCorrect="off"
        // text-specific options
        type="text"
        pattern="^[0-9]*[.,]?[0-9]*$"
        placeholder={placeholder || '0.0'}
        minLength={1}
        maxLength={79}
        spellCheck="false"
        fontSize="20px"
        removeLiquidity={removeLiquidity}
        marginRight="0"
      />
    </Flex>
  )
})

export default Input
