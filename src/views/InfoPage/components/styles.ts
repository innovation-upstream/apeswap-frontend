import styled from 'styled-components'

export const FigureWrapper = styled.div`
  flex-grow: 1;
  width: 33.33%;
  padding: 3px;
  border-radius: 5px;
  .value {
    font-weight: 600;
  }

  &.highlighted {
    background-color: ${({ theme }) => theme.colors.white4};
  }

  &.clickable {
    cursor: pointer;
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
