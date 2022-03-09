import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ButtonMenu, ButtonMenuItem } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'
import Banner from 'views/Home/components/Header/Banner'

const LinkWrapper = styled.a`
  color: inherit;
`

const PoolTabButtons = () => {
  const { pathname } = useRouter()
  const TranslateString = useI18n()
  const url = `/${pathname.split('/')?.[1]}`

  return (
    <Wrapper>
      <ButtonMenu activeIndex={pathname.includes('history') ? 1 : 0} size="sm" variant="yellow">
        <ButtonMenuItem fontSize="12px">
          <Link href={`${url}`} passHref>
            <LinkWrapper>{TranslateString(999, 'Active')}</LinkWrapper>
          </Link>
        </ButtonMenuItem>
        <ButtonMenuItem fontSize="12px">
          <Link href={`${url}/history`}>
            <LinkWrapper>{TranslateString(999, 'Inactive')}</LinkWrapper>
          </Link>
        </ButtonMenuItem>
      </ButtonMenu>
    </Wrapper>
  )
}

export default PoolTabButtons

const Wrapper = styled.div`
  margin-right: 10px;
  margin-left: 20px;

  ${({ theme }) => theme.mediaQueries.md} {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 44px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 34px;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 55px;
  }
`
