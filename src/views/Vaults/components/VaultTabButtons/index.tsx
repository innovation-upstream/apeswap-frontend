import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ButtonMenu, ButtonMenuItem } from '@apeswapfinance/uikit'
import { useTranslation } from 'contexts/Localization'

const LinkWrapper = styled.a`
  color: inherit;
`

const VaultTabButtons = () => {
  const { pathname } = useRouter()
  const url = `/${pathname.split('/')?.[1]}`
  const { t } = useTranslation()

  return (
    <Wrapper>
      <ButtonMenu activeIndex={pathname.includes('history') ? 1 : 0} size="sm" variant="yellow">
        <ButtonMenuItem fontSize="12px">
          <Link href={`${url}`} passHref>
            <LinkWrapper>{t('Active')}</LinkWrapper>
          </Link>
        </ButtonMenuItem>
        <ButtonMenuItem fontSize="12px">
          <Link href={`${url}/history`} passHref>
            <LinkWrapper>{t('Inactive')}</LinkWrapper>
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
