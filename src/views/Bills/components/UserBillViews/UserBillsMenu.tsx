import React, { useRef, useState } from 'react'
import { Checkbox, Flex, Select, SelectItem, Text } from '@apeswapfinance/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useTranslation } from 'contexts/Localization'
import { ClaimAllWrapper, ControlContainer, LabelWrapper, StyledText, Container, StyledInput } from './styles'
import ClaimAll from '../Actions/ClaimAll'
import { Bills } from 'state/types'

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
  onSetSortOption: (value: string) => void
  activeOption?: string
  query: string
  harvestAll?: React.ReactNode
  bills?: Bills[]
  showExpired: boolean
  setShowExpired: (value: boolean) => void
}

const UserBillsMenu: React.FC<UserBillsMenuProps> = ({
  onHandleQueryChange,
  onSetSortOption,
  query,
  activeOption,
  bills,
  showExpired,
  setShowExpired,
}) => {
  const [toggled, setToggled] = useState(false)
  const inputEl = useRef(null)
  const { chainId } = useActiveWeb3React()
  const { t } = useTranslation()
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
      <LabelWrapper>
        <StyledText bold mr="15px">
          {t('Search')}
        </StyledText>
        <Container toggled={toggled}>
          <StyledInput
            ref={inputEl}
            value={query}
            onChange={onHandleQueryChange}
            onBlur={() => setToggled(false)}
            icon="search"
          />
        </Container>
      </LabelWrapper>
      <Flex>
        <Select size="sm" width="126px" onChange={(e) => onSetSortOption(e.target.value)} active={activeOption}>
          {FILTER_OPTIONS.map((option) => {
            return (
              <SelectItem size="sm" value={option.value} key={option.label}>
                <Text>{t(option.label)}</Text>
              </SelectItem>
            )
          })}
        </Select>
      </Flex>
      <Flex style={{ minWidth: '140px', gridArea: 'expired' }}>
        <Text mr="12.5px">{t('Claimed')}</Text>
        <Checkbox checked={showExpired} onClick={() => setShowExpired(!showExpired)} />
      </Flex>
      <ClaimAllWrapper>
        <ClaimAll userOwnedBills={ownedBills} ownedBillsAmount={ownedBillsAmount} />
      </ClaimAllWrapper>
    </ControlContainer>
  )
}

export default React.memo(UserBillsMenu)
