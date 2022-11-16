import { LaunchCalendarCard, State } from '../../../state/types'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../../state'
import useRefresh from '../../../hooks/useRefresh'
import { useEffect } from 'react'
import { fetchHomepageLaunchCalendar } from '../../../state/stats'

export const useInfoPairs = () => {
  console.log('state')
  console.log(useSelector((state: State) => state.info))
  const infoPairs = useSelector((state: State) => state.info.pairs)
  console.log(infoPairs)
  return infoPairs
}

export const useFetchInfoPairs = (amount: number) => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()

  // useEffect(() => {
  //   dispatch(fetchInfoPairs(amount))
  // }, [slowRefresh, amount, dispatch])
}
