/** @jsxImportSource theme-ui */
import React from 'react'
import styled from 'styled-components'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { Toggle } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'

const Wrapper = styled.div`
  width: 100%;
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

const PoolTabButtons: React.FC = () => {
  const { url, isExact } = useRouteMatch()
  const history = useHistory()
  const { t } = useTranslation()

  const handleClick = () => {
    if (isExact) {
      history.push(`${url}/history`)
    } else {
      history.push(url)
    }
  }

  return (
    <Wrapper>
      <Toggle
        size="sm"
        labels={[t('ACTIVE'), t('INACTIVE')]}
        onClick={handleClick}
        checked={!isExact}
        sx={{ height: '36px', alignItems: 'center' }}
      />
    </Wrapper>
  )
}

export default React.memo(PoolTabButtons)
