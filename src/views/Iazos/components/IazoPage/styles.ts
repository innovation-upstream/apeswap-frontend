import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'
import styles from './lazopage.module.css'

export const PageWrapper = styled.div`
  display: none;
  display: flex;
  padding-bottom: 200px;
  margin-bottom: 100px;
  justify-content: center;
`

export const LaunchPadWrapper = styled.div`
  border-radius: 20px;
  margin-top: 50px;
  background: ${(props) => (props.theme.isDark ? '#222222' : 'rgba(255, 255, 255, 1)')};
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`

export const StyledHeader = styled(Text).attrs({
  className: styles.styledHeader
})`
  font-family: Poppins;
  font-weight: 700;
  font-size: 30px;
  font-style: normal;
  line-height: 52px;
`
export const StyledText = styled(Text).attrs({
  className: styles.styledText
})`
  font-family: Poppins;
  font-size: 12px;
`

export const WarningWrapper = styled.div.attrs({
  className: styles.warningWrapper
})`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  left: 411px;
  top: 502px;
  background-color: rgba(223, 65, 65, 0.1);
  border-radius: 10px;
  margin-top: 20px;
  z-index: 0;
  padding: 25px;
`

export const BeforeSaleWrapper = styled.div.attrs({
  className: styles.beforeSaleWrapper
})`
  background: ${(props) => (props.theme.isDark ? ' rgba(51, 51, 51, 1)' : 'rgba(240, 240, 240, 1)')};
  border-radius: 10px;
  width: 300px;
  margin-top: 40px;
  margin-bottom: 40px;
`

export const SpinnerHolder = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 200px;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  margin-left: 20px;
`

export const IazoCardWrapper = styled.div.attrs({
  className: styles.iazoCardWrapper
})`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 110px;
  width: 300px;
  border-radius: 10px;
  margin-bottom: 12.5px;
  background: ${(props) => (props.theme.isDark ? ' rgba(65, 65, 65, 1)' : 'rgba(161, 101, 82, 1)')};
`
export const CardMonkey = styled.div.attrs({
  className: styles.cardMonkey
})`
  position: absolute;
  height: 110px;
  width: 300px;
  overflow: hidden;
  background: url(images/card-ape.svg) no-repeat 425px 0px;
  opacity: 0.2;
`

export const TokenHeaderInformationWrapper = styled.div`
  display: flex;
  height: 65%;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  margin-left: 20px;
`

export const TokenImage = styled.img.attrs({
  className: styles.tokenImage
})`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  margin-left: 10px;
`

export const TokenName = styled(Text).attrs({
  className: styles.TokenName
})`
  font-family: Poppins;
  font-weight: 700;
  font-size: 19px;
  padding-left: 2px;
  align-self: flex-start;
`

export const TokenButtonsWrapper = styled.div.attrs({
  className: styles.tokenButtonsWrapper
})`
  display: flex;
  justify-content: space-between;
  width: 200px;
`

export const TokenInfoButton = styled.div.attrs({
  className: styles.tokenInfoButton
})<{ opacity: string }>`
  display: flex;
  align-items: center;
  padding-left: 5px;
  padding-right: 5px;
  height: 27px;
  border-radius: 5px;
  font-size: 9px;
  cursor: pointer;
  background-color: rgba(255, 179, 0, ${(props) => props.opacity});
  color: white;
  z-index: 1;
`
