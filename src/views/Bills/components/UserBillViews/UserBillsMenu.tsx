/** @jsxImportSource theme-ui */
import React, { useState } from 'react'
import {
  Checkbox,
  Flex,
  Select,
  SelectItem,
  Text,
  Input,
  useMatchBreakpoints,
  Toggle,
  Svg,
  NetworkButton,
} from '@ape.swap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useTranslation } from 'contexts/Localization'
import { ClaimAllWrapper, ControlContainer, SearchText, styles } from './styles'
import ClaimAll from '../Actions/ClaimAll'
import { Bills } from 'state/types'
import { SORT_OPTIONS } from '../BillsListView/BillsListMenu'
import { AVAILABLE_CHAINS_ON_PRODUCTS } from '../../../../config/constants/chains'

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
  showClaimed: boolean
  setShowClaimed: (value: boolean) => void
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
  showClaimed,
  setShowClaimed,
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
        <Flex sx={{ width: '100%', alignItems: 'center', flexDirection: 'column' }}>
          <Flex sx={{ width: '100%', justifyContent: 'center' }}>
            <SearchText bold mr="15px">
              {t('Search')}
            </SearchText>
            <Input value={query} onChange={onHandleQueryChange} icon="search" sx={styles.input} />
            <Flex
              sx={{ backgroundColor: 'lvl1', padding: '10px', borderRadius: '10px', cursor: 'pointer' }}
              onClick={() => setExpended(!expanded)}
            >
              <Svg icon="MenuSettings" width="18px" />
            </Flex>
          </Flex>
          {expanded && (
            <Flex sx={{ width: '100%', justifyContent: 'space-around', flexWrap: 'wrap', maxWidth: '353.4px' }}>
              <Flex sx={{ marginTop: '15px', width: '50%', justifyContent: 'center', paddingRight: '10px' }}>
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
              <Flex sx={{ marginTop: '15px', width: '50%', justifyContent: 'center', paddingLeft: '10px' }}>
                <Select
                  size="xsm"
                  onChange={(e) => setFilterOption(e.target.value)}
                  active={filterOption}
                  sx={{ height: '36px', display: 'flex', width: '100%' }}
                >
                  {FILTER_OPTIONS.map((option) => {
                    return (
                      <SelectItem size="xsm" value={option.value} key={option.label}>
                        <Text>{t(option.label)}</Text>
                      </SelectItem>
                    )
                  })}
                </Select>
              </Flex>
              <Flex sx={{ marginTop: '15px', width: '100%', justifyContent: 'space-around', alignItems: 'center' }}>
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
                  <Checkbox checked={showClaimed} onClick={() => setShowClaimed(!showClaimed)} />
                  <Text ml="15px" size="14px">
                    {t('Claimed')}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          )}
          <Flex sx={{ width: '100%', maxWidth: '350px', marginTop: '15px' }}>
            <ClaimAll userOwnedBills={ownedBills} ownedBillsAmount={ownedBillsAmount} buttonSize={'100%'} />
          </Flex>
        </Flex>
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
            <Checkbox checked={showClaimed} onClick={() => setShowClaimed(!showClaimed)} />
            <Text ml="15px" size="14px">
              {t('Claimed')}
            </Text>
          </Flex>
          <ClaimAllWrapper>
            <ClaimAll userOwnedBills={ownedBills} ownedBillsAmount={ownedBillsAmount} buttonSize={'190px'} />
          </ClaimAllWrapper>
        </>
      )}
    </ControlContainer>
  )
}

export default React.memo(UserBillsMenu)
