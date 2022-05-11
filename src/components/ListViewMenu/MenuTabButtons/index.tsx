import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { Toggle } from '@apeswapfinance/uikit'
import { useTranslation } from 'contexts/Localization'

const Wrapper = styled.div`
  ${({ theme }) => theme.mediaQueries.md} {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const MenuTabButton: React.FC = () => {
  const { pathname, push } = useRouter()
  const url = `/${pathname.split('/')?.[1]}`
  const { t } = useTranslation()

  const handleClick = () => {
    if (!pathname.includes('history')) {
      push(`${url}/history`)
    } else {
      push(url)
    }
  }

  return (
    <Wrapper>
      <Toggle
        size="md"
        labels={[t('ACTIVE'), t('INACTIVE')]}
        onClick={handleClick}
        checked={pathname.includes('history')}
      />
    </Wrapper>
  )
}

export default React.memo(MenuTabButton)
