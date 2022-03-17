import React from 'react'
import { GetServerSideProps } from 'next'
import { getServerSideGenericProps } from 'components/getServersideProps'
import Home from '../views/Home'

export const getServerSideProps: GetServerSideProps = getServerSideGenericProps

const PageContent: React.FC = () => {
  return <Home />
}

export default PageContent
