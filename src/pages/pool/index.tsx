import React from 'react'
import { GetServerSideProps } from 'next'
import { getServerSideGenericProps } from 'components/getServersideProps'
import Pool from 'views/Pool'
import { wrapper } from 'state'
import { getSwapBanners } from 'hooks/api'
import { SwapContextProvider } from 'contexts/SSRContext/Swap/SwapContext'

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const initialProps = await getServerSideGenericProps({ ...context, store })
  let swapBanners = []

  try {
    swapBanners = await getSwapBanners()
  } catch (e) {
    console.warn(e)
  }

  return {
    props: {
      ...initialProps?.props,
      swapBanners,
    },
  }
})

const PoolPage: React.FC<{ swapBanners?: any }> = ({ swapBanners }) => {
  return (
    <SwapContextProvider swapBanner={swapBanners}>
      <Pool />
    </SwapContextProvider>
  )
}

export default PoolPage
