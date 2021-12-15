import { useContext } from 'react'
import { RefreshContext } from 'contexts/RefreshContext'

const useRefresh = () => {
  const { fast, slow, imme } = useContext(RefreshContext)
  return { fastRefresh: fast, slowRefresh: slow, immeRefresh: imme }
}

export default useRefresh
