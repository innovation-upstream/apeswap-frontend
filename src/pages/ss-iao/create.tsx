import React from 'react'
import { GetServerSideProps } from 'next'
import { getServerSideGenericProps } from 'components/getServersideProps'
import CreateIazo from '../../views/Iazos/components/CreateIazo'

export const getServerSideProps: GetServerSideProps = getServerSideGenericProps

const Create: React.FC = () => {
  return <CreateIazo />
}

export default Create
