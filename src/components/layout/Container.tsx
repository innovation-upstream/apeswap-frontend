import styled from 'styled-components'
import styles from './layout.module.css'

const Container = styled.div.attrs({
  className: styles.container,
})`
  margin-left: auto;
  margin-right: auto;
  max-width: 992px;
  padding-left: 16px;
  padding-right: 16px;
`

export default Container
