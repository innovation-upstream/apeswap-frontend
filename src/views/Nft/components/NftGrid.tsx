import styled from 'styled-components'
import { BaseLayout } from '@apeswapfinance/uikit'
import style from './nft.module.css'

const NftGrid = styled(BaseLayout).attrs({
  className: style.nftGrid,
})`
  padding-bottom: 24px;
  padding-top: 24px;

  & > div {
    grid-column: 2 / 6;
  }
`

export default NftGrid
