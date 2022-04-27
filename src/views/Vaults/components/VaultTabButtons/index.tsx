import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ButtonMenu, ButtonMenuItem } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'

const LinkWrapper = styled.a`
  color: inherit;
`

const VaultTabButtons = () => {
  const { pathname } = useRouter()
  const url = `/${pathname.split('/')?.[1]}`
  const TranslateString = useI18n()

  return (
    <Wrapper>
      <ButtonMenu activeIndex={pathname.includes('history') ? 1 : 0} size="sm" variant="yellow">
        <ButtonMenuItem fontSize="12px">
          <Link href={`${url}`} passHref>
            <LinkWrapper>{TranslateString(999, 'Active')}</LinkWrapper>
          </Link>
        </ButtonMenuItem>
        <ButtonMenuItem fontSize="12px">
          <Link href={`${url}/history`} passHref>
            <LinkWrapper>{TranslateString(999, 'Inactive')}</LinkWrapper>
          </Link>
        </ButtonMenuItem>
      </ButtonMenu>
    </Wrapper>
  )
}

export default VaultTabButtons

const Wrapper = styled.div`
  margin-right: 10px;
  margin-left: 30px;

  ${({ theme }) => theme.mediaQueries.md} {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 64px;
    margin-right: 44px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
    margin-right: 34px;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 64px;
    margin-right: 74px;
  }
`
