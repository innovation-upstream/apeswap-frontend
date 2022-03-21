import React, { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import useEagerConnect from 'hooks/useEagerConnect'
import { useFetchTokenPrices, useFetchProfile, useUpdateNetwork } from 'state/hooks'
import { usePollBlockNumber } from 'state/block/hooks'

const isBrowser = typeof window === 'object'

const PageWrapper: React.FC = ({ children }) => {
  const { account } = useWeb3React()

  useEffect(() => {
    console.warn = () => null
  }, [])

  useEffect(() => {
    if (isBrowser && account) dataLayer?.push({ event: 'wallet_connect', user_id: account })
  }, [account])

  useUpdateNetwork()
  useEagerConnect()
  useFetchTokenPrices()
  usePollBlockNumber()
  useFetchProfile()

  return <>{children}</>
}

export default PageWrapper
