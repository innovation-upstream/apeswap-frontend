import React from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import JunglePools from 'views/JunglePools'
import Cookies from 'universal-cookie'
import { CHAIN_ID } from 'config/constants/chains'

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { req } = context
  const cookies = new Cookies(req.cookies)
  const chainIdStr = cookies.get('chainIdStatus')
  const chainId = chainIdStr ? parseInt(chainIdStr) : undefined

  if (!chainIdStr || chainId === CHAIN_ID.MATIC || chainId === CHAIN_ID.MATIC_TESTNET) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

const FarmsPage: React.FC = () => {
  return <JunglePools />
}

export default FarmsPage
