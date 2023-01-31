import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<
  | 'expandedContent'
  | 'styledBtn'
  | 'smallBtn'
  | 'depositContainer'
  | 'harvestAllBtn'
  | 'harvestAction'
  | 'stakeAction'
  | 'onlyDesktop'
  | 'onlyMobile',
  ThemeUIStyleObject
> = {
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
      width: '130px',
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
  harvestAction: {
    width: ['100%', '100%', 'unset'],
    minWidth: '205px',
    justifyContent: 'space-between',
    mt: ['10px', '10px', '0px'],
  },
  stakeAction: {
    maxWidth: ['', '', '94px'],
    alignItems: 'center',
    width: '100%',
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
