import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Providers from './Providers'

const Wrapper = () => (
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
)

const rootElement = document.getElementById('root')

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(<Wrapper />, rootElement)
} else {
  ReactDOM.render(<Wrapper />, rootElement)
}
