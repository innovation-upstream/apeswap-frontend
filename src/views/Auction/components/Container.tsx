import styled from 'styled-components'

const Container = styled.div`
  background: ${({ theme }) => theme.colors.background};
  position: relative;
  height: fit-content;
  min-height: 100vh;
`

export default Container
