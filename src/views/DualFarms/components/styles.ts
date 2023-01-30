import styled from 'styled-components'
import { ArrowDropUpIcon } from '@apeswapfinance/uikit'
import { ThemeUIStyleObject } from 'theme-ui'

export const NextArrow = styled(ArrowDropUpIcon)`
  transform: rotate(90deg);
`

export const styles: Record<string, ThemeUIStyleObject> = {
  expandedContent: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: '0 10px',
    justifyContent: 'space-between',
  },
  styledBtn: {
    fontSize: '16px',
    padding: '10px',
    width: '140px',
    minWidth: '100px',
    height: '44px',
    '@media screen and (max-width: 852px)': {
      minWidth: '130px',
    },
  },
  smallBtn: {
    maxWidth: '60px',
    width: '100%',
    minWidth: '44px',
    height: '44px',
  },
  depositContainer: {
    width: '130px',
    minWidth: '100px',
    justifyContent: 'center',
    alignItems: 'center',
    '@media screen and (max-width: 852px)': {
      minWidth: '130px',
    },
  },
  harvestAllBtn: {
    height: '36px',
    lineHeight: '18px',
    justifyContent: 'center',
    width: '100%',
    '@media screen and (min-width: 852px)': {
      width: '150px',
    },
  },
  onlyDesktop: {
    justifyContent: 'space-around',
    display: ['none', 'none', 'flex'],
  },
  onlyMobile: {
    flexDirection: 'column',
    display: ['flex', 'flex', 'none'],
  },
}
