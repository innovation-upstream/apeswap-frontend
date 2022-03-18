import React from 'react'
import { GetServerSideProps } from 'next'
import { getServerSideGenericProps } from 'components/getServersideProps'
import NfaStaking from 'views/NfaStaking'
import { wrapper } from 'state'

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => getServerSideGenericProps({ ...context, store }),
)

const NfaStakingPage: React.FC = () => {
  return <NfaStaking />
}

export default NfaStakingPage
