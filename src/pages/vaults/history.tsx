import React from 'react'
import { GetServerSideProps } from 'next'
import { getServerSideGenericProps } from 'components/getServersideProps'
import Vaults from 'views/Vaults'
import fetchVaultData from 'state/vaults/fetchVaultData'
import fetchPrices from 'state/tokenPrices/fetchPrices'
import { setVaults } from '../../state/vaults'
import { wrapper } from '../../state'

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const initialProps = await getServerSideGenericProps(context)
  const chainId = initialProps?.props?.chainId

  let vaultData = []
  try {
    const tokenPrices = await fetchPrices(chainId)
    vaultData = await fetchVaultData(chainId, tokenPrices)
  } catch (e) {
    console.error(e)
  }
  store.dispatch(setVaults(vaultData))

  return initialProps
})

const VaultsHistory: React.FC = () => {
  return <Vaults showHistory />
}

export default VaultsHistory
