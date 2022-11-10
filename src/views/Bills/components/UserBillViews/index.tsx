/** @jsxImportSource theme-ui */
import React, { useMemo, useState } from 'react'
import { Bills as BillType } from 'state/types'
import { Container } from '../styles'
import UserBillListView from './UserBillListView'
import UserBillsMenu from './UserBillsMenu'
import { useBills } from 'state/bills/hooks'
import { Flex } from '@ape.swap/uikit'

const UserBillViews: React.FC = () => {
  const bills = useBills()
  const [query, setQuery] = useState('')
  const [sortOption, setSortOption] = useState('all')

  const billsToRender = useMemo((): BillType[] => {
    let billsToReturn = bills
    if (query) {
      billsToReturn = billsToReturn?.filter((bill) => {
        return bill.lpToken.symbol.toUpperCase().includes(query.toUpperCase())
      })
    }
    if (sortOption === 'bananaBill') {
      billsToReturn = billsToReturn?.filter((bill) => bill.billType === 'BANANA Bill')
    }
    if (sortOption === 'jungleBill') {
      billsToReturn = billsToReturn?.filter((bill) => bill.billType === 'JUNGLE Bill')
    }
    return billsToReturn
  }, [bills, query, sortOption])
  const userOwnedBills = billsToRender?.filter((bill) => bill?.userOwnedBillsData?.length > 0)
  const [showExpired, setShowExpired] = useState(true)

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  return (
    <Container>
      <UserBillsMenu
        bills={bills}
        onHandleQueryChange={handleChangeQuery}
        onSetSortOption={setSortOption}
        activeOption={sortOption}
        query={query}
        showExpired={showExpired}
        setShowExpired={setShowExpired}
      />
      <Flex flexDirection="column" sx={{ padding: '20px 0 50px 0' }}>
        <UserBillListView bills={userOwnedBills} showAll={showExpired} />
      </Flex>
    </Container>
  )
}

export default React.memo(UserBillViews)
