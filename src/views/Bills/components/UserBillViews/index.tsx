/** @jsxImportSource theme-ui */
import React, { useMemo, useState } from 'react'
import { Bills as BillType } from 'state/types'
import { Container } from '../styles'
import UserBillListView from './UserBillListView'
import UserBillsMenu from './UserBillsMenu'
import { useBills } from 'state/bills/hooks'
import { Flex } from '@ape.swap/uikit'
import { BillsView } from '../../index'

interface UserBillListViewProps {
  handleBillsViewChange: (view: BillsView) => void
}

const UserBillViews: React.FC<UserBillListViewProps> = ({ handleBillsViewChange }) => {
  const bills = useBills()
  const [query, setQuery] = useState('')
  const [sortOption, setSortOption] = useState('discount')
  const [filterOption, setFilterOption] = useState('all')
  const [showClaimed, setShowClaimed] = useState(true)
  const [listView, setListView] = useState(true)
  const noResults = !!query || filterOption !== 'all' || showClaimed

  const billsToRender = useMemo((): BillType[] => {
    let billsToReturn = bills
    if (query) {
      billsToReturn = billsToReturn?.filter((bill) => {
        return bill.lpToken.symbol.toUpperCase().includes(query.toUpperCase())
      })
    }
    if (filterOption === 'bananaBill') {
      billsToReturn = billsToReturn?.filter((bill) => bill.billType.toUpperCase() === 'BANANA Bill'.toUpperCase())
    }
    if (filterOption === 'jungleBill') {
      billsToReturn = billsToReturn?.filter((bill) => bill.billType.toUpperCase() === 'JUNGLE Bill'.toUpperCase())
    }
    return billsToReturn
  }, [bills, query, filterOption])
  const userOwnedBills = billsToRender?.filter((bill) => bill?.userOwnedBillsData?.length > 0)

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  return (
    <Container>
      <UserBillsMenu
        bills={bills}
        onHandleQueryChange={handleChangeQuery}
        setFilterOption={setFilterOption}
        filterOption={filterOption}
        setSortOption={setSortOption}
        sortOption={sortOption}
        query={query}
        showClaimed={showClaimed}
        setShowClaimed={setShowClaimed}
        listView={listView}
        setListView={setListView}
      />
      <Flex flexDirection="column" sx={{ padding: '20px 0 50px 0', width: '100%' }}>
        <UserBillListView
          bills={userOwnedBills}
          showClaimed={showClaimed}
          listView={listView}
          handleBillsViewChange={handleBillsViewChange}
          noResults={noResults}
        />
      </Flex>
    </Container>
  )
}

export default React.memo(UserBillViews)
