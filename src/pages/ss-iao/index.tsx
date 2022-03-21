import React from 'react'
import { GetServerSideProps } from 'next'
import { getServerSideGenericProps } from 'components/getServersideProps'
import Iazos from '../../views/Iazos'

export const getServerSideProps: GetServerSideProps = getServerSideGenericProps

const SsIao: React.FC = () => {
  return <Iazos />
}

export default SsIao
