import React from 'react'
import { GetServerSideProps } from 'next'
import { getServerSideGenericProps } from 'components/getServersideProps'
import Pool from 'views/Pool'
import { wrapper } from 'state'

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => getServerSideGenericProps({ ...context, store }),
)

const PoolPage: React.FC = () => {
  return <Pool />
}

export default PoolPage
