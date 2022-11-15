import { LaunchCalendarCard } from '../types'
import { baseUrlStrapi } from '../../hooks/api'
import { pairsQuery } from '../../views/Info/queries'
import { CHAINS } from '../../views/Info/config/config'

export const getInfoPairs = async (amount: number, graphAddress: string): Promise<any> => {
  console.log('graph address: ' + graphAddress)
  try {
    console.log('try 1')
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pairsQuery(amount)),
    }

    console.log('try 2')
    const response = await fetch(graphAddress, requestOptions)
    const jsonRes = await response.json()

    return jsonRes.data.pairs

    // let pairs = []
    // await fetch(graphAddress, requestOptions)
    //   .then((res) => res.json())
    //   .then(async (result) => {
    //     console.log('pairs pairs pairs')
    //     console.log(result.data.pairs)
    //     console.log('pairs pairs pairs')
    //     return result.data.pairs
    //   })
    //   .then((
    //
    //   )

    // console.log('^&^&^&')
    // console.log(response)
    // console.log('^&^&^&')

    //  return null
    //
    // fetch(graphAddress, requestOptions)
    //   .then((res) => res.json())
    //   .then(async (result) => {
    //     console.log('pairs pairs pairs')
    //     console.log(result.data.pairs)
    //     console.log('pairs pairs pairs')
    //     return result.data.pairs
    //   })
    //   .catch(async (error) => {
    //     console.log('THERE WAS AN ERROR')
    //     console.log(error)
    //     console.log(graphAddress)
    //   })
  } catch (error) {
    console.log('hit error')
    return null
  }
}
