import React from 'react'
import { GetServerSideProps } from 'next'
import { getServerSideGenericProps } from 'components/getServersideProps'
import Ifos from '../../views/Ifos'

export const getServerSideProps: GetServerSideProps = getServerSideGenericProps

const Iao: React.FC = () => {
  return <Ifos />
}

export default Iao
