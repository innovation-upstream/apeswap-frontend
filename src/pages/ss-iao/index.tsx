import React from 'react'
import { GetServerSideProps } from 'next'
import { getServerSideGenericProps } from 'components/getServersideProps'
import Iazos from 'views/Iazos'
import { wrapper } from 'state'
import { iazosFetchSucceeded } from 'state/iazos'
import fetchIazosFromApi from 'state/iazos/fetchIazosFromApi'
import { fetchIazoStatusInfo, fetchIazoTokenDetails, isRegisteredIazoCheck } from 'state/iazos/fetchIazoWeb3'

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const initialProps = await getServerSideGenericProps({ ...context, store })
  const chainId = initialProps?.props?.chainId

  const registeredIazo = []
  try {
    const iaoData = await fetchIazosFromApi(chainId)
    await Promise.all(
      iaoData?.map(async (iazo) => {
        const isRegestered = await isRegisteredIazoCheck(chainId, iazo.iazoContractAddress)
        const pass = isRegestered?.isRegistered

        if (pass) {
          const iazoTokenDetails = await fetchIazoTokenDetails(chainId, iazo.baseToken.address, iazo.iazoToken.address)
          const iazoStatusInfo = await fetchIazoStatusInfo(chainId, iazo.iazoContractAddress)
          registeredIazo.push({
            ...iazo,
            ...iazoTokenDetails,
            ...iazoStatusInfo,
            isRegistered: true,
          })
          return
        }
        registeredIazo.push(iazo)
      }),
    )
  } catch (e) {
    console.error(e)
  }

  await store.dispatch(iazosFetchSucceeded({ liveIazosData: registeredIazo, singleFlag: false }))

  return initialProps
})
const SsIao: React.FC = () => {
  return <Iazos />
}

export default SsIao
