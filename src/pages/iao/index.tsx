import React from 'react'
import { GetServerSideProps } from 'next'
import { getServerSideGenericProps } from 'components/getServersideProps'
import Ifos from 'views/Ifos'
import { wrapper } from 'state'

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => getServerSideGenericProps({ ...context, store }),
)

const Iao: React.FC = () => {
  return <Ifos />
}

export default Iao
