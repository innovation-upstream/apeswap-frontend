import React from 'react'
import { GetServerSideProps } from 'next'
import { getServerSideGenericProps } from 'components/getServersideProps'
import NfaStaking from 'views/NfaStaking'
import { wrapper } from 'state'

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const initialProps = await getServerSideGenericProps({ ...context, store })
  const { req } = context

  let size = { width: 0 }
  if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(req.headers['user-agent'])) {
    size = { width: 1000 }
  }

  return {
    props: {
      ...initialProps.props,
      size,
    },
  }
})

const NfaStakingPage: React.FC<{ size?: any }> = ({ size }) => {
  return <NfaStaking initSize={size} />
}

export default NfaStakingPage
