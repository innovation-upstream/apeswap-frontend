import React from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getServerSideGenericProps } from 'components/getServersideProps'
import AddLiquidity from 'views/AddLiquidity'
import { wrapper } from 'state'

const OLD_PATH_STRUCTURE = /^(0x[a-fA-F0-9]{40}|BNB)-(0x[a-fA-F0-9]{40}|BNB)$/

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (context: GetServerSidePropsContext) => {
    const initialProps = await getServerSideGenericProps({ ...context, ...store })
    const { params } = context
    let props = {
      ...initialProps?.props,
    }

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
        ...props,
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
        ...props,
        currencyIdA: currencies[0],
        currencyIdB: currencies[1],
      }
    }

    return {
      props,
    }
  },
)

const AddLiquidityPage: React.FC = (props: any) => {
  return <AddLiquidity {...props} />
}

export default AddLiquidityPage
