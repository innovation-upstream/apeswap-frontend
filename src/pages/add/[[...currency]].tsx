import React from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import AddLiquidity from '../../views/AddLiquidity'

const OLD_PATH_STRUCTURE = /^(0x[a-fA-F0-9]{40}|BNB)-(0x[a-fA-F0-9]{40}|BNB)$/

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { params } = context
  let props = {}

  const currencies = params?.currency

  if (currencies?.length === 1) {
    const match = currencies[0].match(OLD_PATH_STRUCTURE)
    if (match?.length) {
      return {
        redirect: {
          destination: `/add/${match[1]}/${match[2]}`,
          permanent: false,
        },
      }
    }
    props = {
      currencyIdA: currencies[0],
    }
  }

  if (currencies?.length === 2) {
    if (currencies[0].toLowerCase() === currencies[1].toLowerCase()) {
      return {
        redirect: {
          destination: `/add/${currencies[0]}`,
          permanent: false,
        },
      }
    }
    props = {
      currencyIdA: currencies[0],
      currencyIdB: currencies[1],
    }
  }

  return {
    props,
  }
}

const AddLiquidityPage: React.FC = (props: any) => {
  return <AddLiquidity {...props} />
}

export default AddLiquidityPage
