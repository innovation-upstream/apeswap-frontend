import React from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getServerSideGenericProps } from 'components/getServersideProps'
import Vaults from 'views/Vaults'
import fetchVaultData from 'state/vaults/fetchVaultData'
import fetchPrices from 'state/tokenPrices/fetchPrices'

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const initialProps = await getServerSideGenericProps(context)
  const chainId = initialProps?.props?.chainId

  let vaultData = []
  try {
    const tokenPrices = await fetchPrices(chainId)
    vaultData = await fetchVaultData(chainId, tokenPrices)
  } catch (e) {
    console.error(e)
  }

  return {
    props: {
      ...initialProps?.props,
      vaultData: JSON.parse(JSON.stringify(vaultData)),
    },
  }
}

const VaultsHistory: React.FC<{ vaultData: any[] }> = ({ vaultData }) => {
  return <Vaults showHistory vaultData={vaultData} />
}

export default VaultsHistory
