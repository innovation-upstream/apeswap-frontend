/** @jsxImportSource theme-ui */
import React, { useState } from 'react'
import { Checkbox, Flex, Select, SelectItem, Text, Input, useMatchBreakpoints, Toggle } from '@ape.swap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useTranslation } from 'contexts/Localization'
import { ClaimAllWrapper, ControlContainer, SearchText, styles } from './styles'
import ClaimAll from '../Actions/ClaimAll'
import { Bills } from 'state/types'
import { SORT_OPTIONS } from '../BillsListView/BillsListMenu'

export const FILTER_OPTIONS = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'BANANA',
    value: 'bananaBill',
  },
  {
    label: 'Jungle',
    value: 'jungleBill',
  },
]

export interface UserBillsMenuProps {
  onHandleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  setFilterOption: (value: string) => void
  filterOption?: string
  setSortOption: (value: string) => void
  sortOption?: string
  query: string
  harvestAll?: React.ReactNode
  bills?: Bills[]
  showOnlyClaimed: boolean
  setShowOnlyClaimed: (value: boolean) => void
  listView: boolean
  setListView: (view: boolean) => void
}

const UserBillsMenu: React.FC<UserBillsMenuProps> = ({
  onHandleQueryChange,
  setFilterOption,
  filterOption,
  setSortOption,
  query,
  sortOption,
  bills,
  showOnlyClaimed,
  setShowOnlyClaimed,
  listView,
  setListView,
}) => {
  const { chainId } = useActiveWeb3React()
  const { t } = useTranslation()
  const { isLg, isXl, isXxl } = useMatchBreakpoints()
  const isMobile = !isLg && !isXl && !isXxl
  const [expanded, setExpended] = useState<boolean>(false)
  const userOwnedBills = bills?.filter((bill) => bill?.userOwnedBillsData?.length > 0)
  const ownedBillsAmount = bills
    ?.flatMap((bill) => (bill?.userOwnedBillsData ? bill.userOwnedBillsData : []))
    .filter((b) => parseFloat(b.pendingRewards) > 0).length
  const ownedBills = userOwnedBills?.map((bill) => {
    return (
      bill?.userOwnedBillsData && {
        billAddress: bill.contractAddress[chainId],
        billIds: bill.userOwnedBillsData
          .filter((b) => parseFloat(b.pendingRewards) > 0)
          .map((b) => {
            return b.id
          }),
      }
    )
  })
  return (
    <ControlContainer>
      {isMobile ? (
        <Flex sx={{ width: '100%', alignItems: 'center', flexDirection: 'column' }}>asdasd</Flex>
      ) : (
        <>
          <SearchText bold mr="15px">
            {t('Search')}
          </SearchText>
          <Input value={query} onChange={onHandleQueryChange} icon="search" sx={styles.input} />
          <Flex>
            <Select
              size="xsm"
              onChange={(e) => setSortOption(e.target.value)}
              active={sortOption}
              sx={{ height: '36px', display: 'flex', width: '100%' }}
            >
              {SORT_OPTIONS.map((option) => {
                return (
                  <SelectItem size="sm" value={option.value} key={option.label}>
                    <Text>{t(option.label)}</Text>
                  </SelectItem>
                )
              })}
            </Select>
          </Flex>
          <Flex>
            <Select
              size="xsm"
              onChange={(e) => setFilterOption(e.target.value)}
              active={filterOption}
              sx={{ height: '36px', display: 'flex', width: '95px' }}
            >
              {FILTER_OPTIONS.map((option) => {
                return (
                  <SelectItem size="sm" value={option.value} key={option.label}>
                    <Text>{t(option.label)}</Text>
                  </SelectItem>
                )
              })}
            </Select>
          </Flex>
          <Flex>
            <Toggle
              size="sm"
              labels={[t('List'), t('Gallery')]}
              onClick={() => setListView(!listView)}
              checked={!listView}
              sx={{ height: '36px', alignItems: 'center' }}
            />
          </Flex>
          <Flex>
            <Checkbox checked={showOnlyClaimed} onClick={() => setShowOnlyClaimed(!showOnlyClaimed)} />
            <Text ml="15px" size="14px">
              {t('Claimed')}
            </Text>
          </Flex>
          <ClaimAllWrapper>
            <ClaimAll userOwnedBills={ownedBills} ownedBillsAmount={ownedBillsAmount} />
          </ClaimAllWrapper>
        </>
      )}
    </ControlContainer>
  )
}

export default React.memo(UserBillsMenu)
