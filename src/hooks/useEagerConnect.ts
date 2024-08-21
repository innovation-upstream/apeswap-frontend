import { useEffect } from 'react'
import { connectionByType } from 'utils/connection'

export default function useEagerConnect() {
  useEffect(() => {
    const selectedConnector = localStorage.getItem('accountStatus')
    const { connector } = connectionByType[selectedConnector] ?? { connector: undefined }
    if (connector?.connectEagerly) {
      connector.connectEagerly()
    }
  }, [])
}
