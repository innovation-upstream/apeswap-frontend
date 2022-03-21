import React from 'react'
import { GetServerSideProps } from 'next'
import { getServerSideGenericProps } from 'components/getServersideProps'
import ApeZone from '../../views/ApeZone'

export const getServerSideProps: GetServerSideProps = getServerSideGenericProps

const ApeZonePage: React.FC = () => {
  return <ApeZone />
}

export default ApeZonePage
