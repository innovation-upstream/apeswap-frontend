import React from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getServerSideGenericProps } from 'components/getServersideProps'
import JunglePools from 'views/JunglePools'
import { CHAIN_ID } from 'config/constants/chains'

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const initialProps = await getServerSideGenericProps(context)
  const chainId = initialProps?.props?.chainId

  if (!chainId || chainId === CHAIN_ID.MATIC || chainId === CHAIN_ID.MATIC_TESTNET) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return initialProps
}

const JungleFarmsHistory: React.FC = () => {
  return <JunglePools showHistory />
}

export default JungleFarmsHistory
