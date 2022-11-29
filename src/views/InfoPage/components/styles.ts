import styled from 'styled-components'
import { Link } from '@apeswapfinance/uikit'

export const FigureWrapper = styled.div`
  flex-grow: 1;
  width: 100%;
  padding: 3px;
  border-radius: 5px;
  margin-bottom: 10px;

  ${({ theme }) => theme.mediaQueries.md} {
    width: 33.33%;
    margin-bottom: 0px;
  }
  
  .value {
    font-weight: 600;
  }

  &.highlighted {
    background-color: ${({ theme }) => theme.colors.white4};
  }

  &.clickable {
    cursor: pointer;
  }

  .date-selector {
    margin-left: 15px;
    cursor: pointer;
    &:not(.live) {
      opacity: 50%;
    }
`

export const RangeSelectorsWrapper = styled.div`
  margin-top: 10px;
  ul {
    list-style-type: none;
  }
  li {
    float: left;
    margin-left: 15px;
    cursor: pointer;
    &:not(.active) {
      opacity: 50%;
    }
  }

  &.transctionSelector {
    margin-top: 7px;
    position: absolute;

    li {
      margin-left: 0px;
      margin-right: 10px;
    }
  }
`

export const ShowcaseWrapper = styled.div`
  width: calc(50% - 10px);
  margin-bottom: 10px;
`

export const ChartWrapper = styled.div`
  height: 330px;
  width: 100%;
  min-width: 100%;
  flex: 1 0 100%;
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

export const CenteredImage = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

export const Bubble = styled.div<{ isActive?: boolean }>`
  background: ${({ isActive, theme }) =>
    isActive ? 'linear-gradient(53.53deg, #a16552 15.88%, #e1b242 92.56%)' : theme.colors.white4};
  height: 14px;
  width: 14px;
  border-radius: 50px;
  margin: 0px 2.5px 0px 2.5px;
  cursor: pointer;
`
export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.yellow};
`
