import { Tag } from '@ape.swap/uikit'
import styled from '@emotion/styled'
import { ThemeUIStyleObject } from 'theme-ui'

export const poolStyles: Record<string, ThemeUIStyleObject> = {
  styledBtn: {
    fontSize: '16px',
    padding: '10px',
    width: '130px',
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
  apeHarder: {
    fontSize: '16px',
    minWidth: '110px',
    width: '100%',
    '@media screen and (min-width: 852px)': {
      width: '140px',
    },
    height: '44px',
  },
  container: {
    position: 'relative',
  },
  actionContainer: {
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  expandedContent: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: '0 10px',
    justifyContent: 'space-between',
  },
  harvestContainer: {
    '@media screen and (max-width: 852px)': {
      flexWrap: 'wrap',
      width: '100%',
    },
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

export const StyledTag = styled(Tag)`
  font-size: 10px !important;
  padding: 0px 6px !important;
  font-weight: 700 !important;
  border: none !important;
  border-radius: 10px !important;
  height: auto !important;
  width: max-content !important;
`
