/** @jsxImportSource theme-ui */
import { ThemeUIStyleObject } from 'theme-ui'
import { Flex } from '@apeswapfinance/uikit'
import styled from 'styled-components'

export const styles: Record<string, ThemeUIStyleObject> = {
  listViewContainer: {
    justifyContent: 'space-between',
    '@media screen and (min-width: 852px)': {
      justifyContent: 'center',
    },
    width: '100%',
  },
  titleContainer: {
    alignItems: 'center',
    height: '100%',
    maxWidth: '290px',
    width: '100%',
  },
  titleText: {
    opacity: 0.6,
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 400,
  },
  skeleton: {
    width: '60px',
    maxHeight: '18px',
    minHeight: '18px',
  },
  valueText: {
    fontSize: ['12px', '12px', '16px'],
    color: 'primaryBright',
    lineHeight: '16px',
    fontWeight: 700,
  },
  secondaryText: {
    fontSize: '12px',
    color: 'gray',
    lineHeight: '16px',
    fontWeight: 400,
  },
  cardContentContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  animationDiv: {
    position: 'relative',
    width: '100%',
    maxWidth: '500px',
    minWidth: '300px',
  },
  expandedWrapper: {
    background: 'white3',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '15px 10px',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
}

export const ListCardContainer = styled(Flex)<{ backgroundColor?: string }>`
  border-radius: 0;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme, backgroundColor }) =>
    backgroundColor === 'white3' ? theme.colors.white3 : theme.colors.white2};
  border-bottom: ${({ backgroundColor }) =>
    `1px solid ${backgroundColor === 'white3' ? 'rgba(226, 226, 226, .7)' : 'rgba(226, 226, 226, .2)'}`};
  padding: 10px 20px 10px 20px;
  margin: 0px 10px 0px 10px;
  max-width: 500px;
  min-width: 300px;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    height: 86px;
    padding: 0px 30px 0px 30px;
    max-width: 100%;
  }
`
export const ListViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  z-index: 1;
  & ${ListCardContainer}:first-child {
    border-radius: 10px 10px 0px 0px;
  }
  & ${ListCardContainer}:last-child {
    border-radius: 0px 0px 10px 10px;
    border: none;
  }
  & ${ListCardContainer}:first-child:last-child {
    border-radius: 10px 10px 10px 10px;
    border: none;
  }
`

export const ContentContainer = styled(Flex)`
  position: relative;
  width: 100%;
  height: 100%;
  align-items: flex-end;
  justify-content: space-between;
`
