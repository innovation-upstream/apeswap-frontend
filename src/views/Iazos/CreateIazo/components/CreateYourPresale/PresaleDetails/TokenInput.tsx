import React from 'react'
import styled from 'styled-components'
import { Text, Image } from '@apeswapfinance/uikit'

interface TextInputProps {
  placeholderText?: string
  title?: string
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void
  backgroundColor?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  ml?: string
  mr?: string
  disabled?: boolean
  userBalance?: number
  defaultVal?: string
  quoteTokenSymbol?: string
  tokenSymbol?: string
}

const sizes = {
  sm: '250px',
  md: '310px',
  lg: '525px',
  xl: '645px',
}

const InputContainer = styled.div<{ size: string; ml: string; mr: string }>`
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  justify-content: center;
  height: 65px;
  width: ${(props) => sizes[props.size]};
  margin-left: ${(props) => props.ml};
  margin-right: ${(props) => props.mr};
`

const Input = styled.input<{ backgroundColor: string }>`
  height: 100%;
  width: 100%;
  border-radius: 10px;
  padding-left: 15px;
  font-family: Poppins;
  font-weight: 700;
  font-size: 22px;
  line-height: 23px;
  text-align: left;
  background: ${(props) => props.backgroundColor || '#333333'};
  color: #ffffff;
  border: none;
  z-index: 0;
`

const InputTitle = styled(Text)`
  position: absolute;
  top: -30px;
  align-self: center;
  align-content: center;
  font-family: Poppins;
  font-size: 16px;
  font-weight: 700;
`

const StyledHeader = styled(Text)`
  font-family: Poppins;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
`
const IconImage = styled(Image)`
  align: left;
  margin-right: 12px;
`

const HeaderWrapper = styled.div`
  position: absolute;
  height: 35px;
  right: 15px;
  width: 90px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

const UserBalanceWrapper = styled(Text)`
  height: 15px;
  font-family: Poppins;
  font-weight: bold;
  font-size: 10px;
  opacity: 0.7;
`

const TokenWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  right: 0px;
  height: 54px;
  width: 170px;
`

const TokenInput: React.FC<TextInputProps> = ({
  size = 'md',
  disabled,
  onChange,
  backgroundColor,
  quoteTokenSymbol,
  tokenSymbol,
  userBalance,
  placeholderText,
  title,
  ml,
  mr,
  defaultVal,
}) => {
  return (
    <InputContainer size={size} ml={ml} mr={mr}>
      <InputTitle>{title}</InputTitle>
      <Input
        defaultValue={defaultVal}
        onChange={onChange}
        backgroundColor={backgroundColor}
        placeholder={placeholderText}
        disabled={disabled}
      />
      {quoteTokenSymbol ? (
        <HeaderWrapper>
          <IconImage height={25} width={25} src={`/images/tokens/${quoteTokenSymbol}.svg`} alt="token" />
          <StyledHeader>{quoteTokenSymbol}</StyledHeader>
        </HeaderWrapper>
      ) : (
        <TokenWrapper>
          <StyledHeader>{tokenSymbol}</StyledHeader>
          <UserBalanceWrapper> Balance: {userBalance.toFixed(6)} </UserBalanceWrapper>
        </TokenWrapper>
      )}
    </InputContainer>
  )
}

export default TokenInput