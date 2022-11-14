import styled from 'styled-components'
import { LeftArrow, RightArrow } from '../../components/Icons'

interface RowProps {
  background?: boolean
}

interface ColumnProps {
  width?: string
  flex?: string
}

export const BodyWrapper = styled.div`
  top: 120px;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`

export const FiguresWrapper = styled.div`
  position: relative;
  max-width: 1412px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.white2};
  border-radius: 10px;
  z-index: 1;
  padding: 15px 20px 0px 20px;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: grid;
    grid-template-rows: 50px 150px 20px;
    width: 95vw;
    padding: 20px calc(40% - 200px);
  }
  @media screen and (min-width: 1200px) {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 10px 20px;
  }
`

export const Row = styled.div<RowProps>`
  width: 100%;
  background: ${(props) => props.background && props.theme.colors.white3};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  flex-shrink: 0;

  :first-child {
    height: 40px;

    div {
      font-weight: 600;
    }
  }

  :nth-child(2) {
    border-radius: 10px 10px 0 0;
  }

  :last-child {
    border-radius: 0 0 10px 10px;
  }
`

export const Column = styled.div<ColumnProps>`
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  text-align: left;
  padding: 0 8px;
  display: flex;
  align-items: center;
  flex: 1;
  flex: ${(props) => props.flex && props.flex};
  flex: ${(props) => props.width && '0 0 ' + props.width};
  color: ${(props) => props.theme.colors.text};

  .logo {
    margin-right: 12px;
  }
`

export const IconBox = styled.div`
  border-radius: 5px;
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.white3};
  position: relative;
  flex-shrink: 0;
  float: left;
  margin-right: 10px;
`

export const HeadingWrapper = styled.div`
  position: relative;
  max-width: 1412px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: column;
  z-index: 1;
  padding: 15px 20px 0px 20px;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: grid;
    grid-template-rows: 50px 150px 20px;
    width: 95vw;
    padding: 20px calc(40% - 200px);
  }
  @media screen and (min-width: 1200px) {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 0px;
  }

  .heading {
    font-weight: 600;
  }
`

export const LeftArrowIcon = styled(LeftArrow)`
  color: ${({ theme }) => (theme.isDark ? theme.colors.primaryBright : theme.colors.primary)};
`

export const RightArrowIcon = styled(RightArrow)`
  width: 7px;
  height: 6px;
  color: ${({ theme }) => (theme.isDark ? theme.colors.primaryBright : theme.colors.primary)};
`
