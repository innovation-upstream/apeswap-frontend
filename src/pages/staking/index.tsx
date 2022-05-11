import React from 'react'
import { GetServerSideProps } from 'next'
import { getServerSideGenericProps } from 'components/getServersideProps'
import NfaStaking from 'views/NfaStaking'
import { wrapper } from 'state'

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const initialProps = await getServerSideGenericProps({ ...context, store })

  return {
    props: {
      ...initialProps.props,
    },
  }
})

const NfaStakingPage: React.FC = () => {
  return <NfaStaking />
}

export default NfaStakingPage
