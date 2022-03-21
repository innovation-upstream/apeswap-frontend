import React from 'react'
import { GetServerSideProps } from 'next'
import { getServerSideGenericProps } from 'components/getServersideProps'
import NfaStaking from '../../views/NfaStaking'

export const getServerSideProps: GetServerSideProps = getServerSideGenericProps

const NfaStakingPage: React.FC = () => {
  return <NfaStaking />
}

export default NfaStakingPage
