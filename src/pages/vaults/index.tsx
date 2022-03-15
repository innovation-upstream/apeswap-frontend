import React from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Vaults from 'views/Vaults'
import fetchVaultData from 'state/vaults/fetchVaultData'
import fetchPrices from 'state/tokenPrices/fetchPrices'
import Cookies from 'universal-cookie'

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { req } = context
  const cookies = new Cookies(req.cookies)
  const chainIdStr = cookies.get('chainIdStatus')
  const chainId = parseInt(chainIdStr)

  let vaultData = []
  try {
    const tokenPrices = await fetchPrices(chainId)
    vaultData = await fetchVaultData(chainId, tokenPrices)
  } catch (e) {
    console.error(e)
  }

  return {
    props: {
      vaultData: JSON.parse(JSON.stringify(vaultData)),
    },
  }
}

const VaultsPage: React.FC<{ vaultData: any[] }> = ({ vaultData }) => {
  return <Vaults vaultData={vaultData} />
}

export default VaultsPage
