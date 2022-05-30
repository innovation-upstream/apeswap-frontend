import { getServerSideGenericProps } from 'components/getServersideProps'
import { getSwapBanners } from 'hooks/api'
import { GetServerSideProps } from 'next'
import React from 'react'
import { wrapper } from 'state'
import { SwapContextProvider } from 'contexts/SSRContext/Swap/SwapContext'
import Orders from 'views/Orders'

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const initialProps = await getServerSideGenericProps({ ...context, store })
  let swapBanners = []

  try {
    swapBanners = await getSwapBanners()
  } catch (e) {
    console.warn(e)
  }

  return {
    props: JSON.parse(
      JSON.stringify({
        ...initialProps?.props,
        swapBanners,
      }),
    ),
  }
})

interface OrdersPageProps {
  swapBanners?: any
}

const OrdersPage: React.FC<OrdersPageProps> = ({ swapBanners }) => {
  return (
    <SwapContextProvider swapBanner={swapBanners}>
      <Orders />
    </SwapContextProvider>
  )
}

export default OrdersPage
