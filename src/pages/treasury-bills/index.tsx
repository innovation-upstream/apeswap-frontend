import React from 'react'
import Bills from 'views/Bills'
import { GetServerSideProps } from 'next'
import { getServerSideGenericProps } from 'components/getServersideProps'
import { wrapper } from 'state'
import fetchBills from 'state/bills/fetchBills'
import fetchPrices from 'state/tokenPrices/fetchPrices'
import { setBillsPublicData } from 'state/bills'

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const initialProps = await getServerSideGenericProps(context)
  const chainId = initialProps?.props?.chainId

  let treasuryBills = []
  try {
    const tokenPrices = await fetchPrices(chainId)
    treasuryBills = await fetchBills(chainId, tokenPrices)
  } catch (e) {
    console.warn(e)
  }
  store.dispatch(setBillsPublicData(JSON.parse(JSON.stringify(treasuryBills))))
  return initialProps
})

const BillsPage: React.FC = () => {
  return <Bills />
}

export default BillsPage
