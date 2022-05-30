import React from 'react'
import { GetServerSideProps } from 'next'
import { wrapper } from '../../state'

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  }
})

export default function Index() {
  return null
}
