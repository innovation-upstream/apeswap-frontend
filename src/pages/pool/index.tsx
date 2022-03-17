import React from 'react'
import { GetServerSideProps } from 'next'
import { getServerSideGenericProps } from 'components/getServersideProps'
import Pool from '../../views/Pool'

export const getServerSideProps: GetServerSideProps = getServerSideGenericProps

const PoolPage: React.FC = () => {
  return <Pool />
}

export default PoolPage
