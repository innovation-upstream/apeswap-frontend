import styled from 'styled-components'
import { LeftArrow, RightArrow } from '../../components/Icons'
import { Input } from '@apeswapfinance/uikit'

interface RowProps {
  background?: boolean
}

interface ColumnProps {
  width?: string
  flex?: string
}

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;

  &.small-mt {
    margin-top: 10px;
  }

  @media screen and (min-width: 1200px) {
    flex-direction: row;
  }
`

export const SectionsWrapper = styled.div`
  position: relative;
  max-width: 1412px;
  width: 95vw;
  z-index: 1;
  align-items: center;
  @media screen and (min-width: 1200px) {
    width: 95vw;
    display: flex;
    flex-direction: row;
    padding: 0px;
  }
`

export const SearchInput = styled(Input)`
  width: 1000px;
  border: none;
  font-size: 22px;
  font-weight: 700;
`

export const Section = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  // flex-direction: column;
  background: ${({ theme }) => theme.colors.white2};
  border-radius: 10px;
  z-index: 1;
  padding: 15px 20px 0px 20px;
  align-items: center;
  &.right-section {
    margin-top: 20px;
  }
  &.section-large {
    flex: 2;
  }
  .figure {
    flex-grow: 1;
    padding: 10px 0px;
    width: 50%;
    .figureValue {
      font-weight: 600;
    }
    &.figure-full {
      width: 100%;
    }
  }

  .chain {
    flex: 0 0 50px;
    padding: 10px 0px;
    margin-right: 0px;

    img {
      border: 2px solid #fff;
      border-radius: 50%;
    }
  }

  .search-wrapper {
    flex: 3;
  }

  @media screen and (min-width: 1200px) {
    width: 95vw;
    display: flex;
    flex-direction: row;
    padding: 10px 20px;

    &.left-section {
      margin-right: 20px;
    }

    &.right-section {
      margin-top: 0px;
      margin-left: 20px;
    }

    //:first-child {
    //
    //}
    //:last-child {

    //}

    .figure {
      width: 33.33%;
    }
  }

  .showcase {
    width: calc(50% - 10px);
    margin-bottom: 10px;
  }

  .graphFrame {
    height: 327px;
    width: 100%;
  }

  .sectionFrame {
    height: 389px;
    width: 100%;
  }
`

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

  .figure {
    flex-grow: 1;
    width: 33.33%;
    padding: 10px 0px;

    .figureValue {
      font-weight: 600;
    }
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
    border: 2px solid #ffffff;
    border-radius: 50%;
    margin-right: 12px;
  }

  .logo-right {
    margin-left: -24px;
  }

  .fav {
    cursor: pointer;
  }

  @media screen and (max-width: 400px) {
    &.mobile-hidden {
      display: none;
    }
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

  .heading-large {
    font-size: 35px;
  }

  .logo {
    margin: 20px 0px 0px 5px;
    border: 2px solid #ffffff;
    border-radius: 50%;
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
