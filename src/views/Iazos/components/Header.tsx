import React from 'react'
import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'
import styles from './lazocomponents.module.css'

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <HeadingText>Self-Serve IAO</HeadingText>
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.div.attrs(props => ({
  className: props.theme.isDark ? styles.headerWrapperDark : styles.headerWrapper
}))`
  position: relative;
  overflow-y: hidden;
  overflow-x: hidden;
  height: 251px;
  width: 100%;
  padding-top: 36px;
  background-image: ${(props) =>
    props.theme.isDark ? 'url(/images/ss-iao-mobile-night.svg)' : 'url(/images/ss-iao-mobile.svg)'};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`

const HeadingText = styled(Text).attrs({
  className: styles.headingText
})`
  position: absolute;
  text-align: center;
  letter-spacing: 0.05em;
  color: #fafafa;
  width: 366px;
  height: 125px;
  font-family: Titan One;
  font-style: normal;
  font-weight: normal;
  font-size: 28px;
  line-height: 57px;
  text-align: center;
  letter-spacing: 0.05em;
  top: 40px;
  left: -45px;
`

export default Header
