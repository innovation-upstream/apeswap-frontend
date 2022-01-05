import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'
import styles from './lazocomponents.module.css'

export const BoldAfterText = styled(Text).attrs({
  className: styles.boldAfterText
})<{ boldContent?: string }>`
  font-family: poppins;
  font-weight: 400;
  font-size: 11px;
  &:after {
    font-weight: 700;
    content: '${(props) => props.boldContent}';
  }
`

export const BoldAfterTextLarge = styled(Text).attrs({
  className: styles.boldAfterTextLarge
})<{ boldContent?: string }>`
  font-family: poppins;
  font-weight: 400;
  font-size: 13px;
  &:after {
    font-weight: 700;
    font-size: 14px;
    content: '${(props) => props.boldContent}';
  }
`

export const Heading = styled(Text).attrs({
  className: styles.heading
})`
  font-family: Poppins;
  font-weight: 700;
  font-size: 25px;
`

export const StyledText = styled(Text).attrs({
  className: styles.styledText
})`
  font-family: Poppins;
  font-size: 12px;
`
