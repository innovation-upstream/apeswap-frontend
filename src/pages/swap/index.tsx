import React from 'react'
import { GetServerSideProps } from 'next'
import { getServerSideGenericProps } from 'components/getServersideProps'
import Swap from '../../views/Swap'

export const getServerSideProps: GetServerSideProps = getServerSideGenericProps

const SwapPage: React.FC = () => {
  return <Swap />
}

export default SwapPage
