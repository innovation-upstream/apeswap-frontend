import React from 'react'
import { GetServerSideProps } from 'next'
import { getServerSideGenericProps } from 'components/getServersideProps'
import CreateIazo from 'views/Iazos/components/CreateIazo'
import { wrapper } from 'state'

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => getServerSideGenericProps({ ...context, store }),
)

const Create: React.FC = () => {
  return <CreateIazo />
}

export default Create
