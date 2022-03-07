import React from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Farms from 'views/Farms'
import DualFarms from 'views/DualFarms'
import { CHAIN_ID } from 'config/constants/chains'
import Cookies from 'universal-cookie'

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { req } = context
  const cookies = new Cookies(req.cookies)
  const chainIdStr = cookies.get('chainIdStatus')
  const props = chainIdStr ? { chainId: parseInt(chainIdStr) } : {}

  return {
    props: {
      ...props,
    },
  }
}

const FarmsPage: React.FC<{ chainId?: number }> = ({ chainId }) => {
  return chainId === CHAIN_ID.MATIC || chainId === CHAIN_ID.MATIC_TESTNET ? <DualFarms /> : <Farms />
}

export default FarmsPage
