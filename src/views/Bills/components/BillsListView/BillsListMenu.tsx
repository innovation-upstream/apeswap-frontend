import React, { useRef, useState } from 'react'
import { Checkbox, Flex, Select, SelectItem, Text } from '@apeswapfinance/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useTranslation } from 'contexts/Localization'
import { ControlContainer, LabelWrapper, StyledText, Container, StyledInput } from './styles'
import { Bills } from 'state/types'
import { NetworkButton, Toggle } from '@ape.swap/uikit'
import useSelectNetwork from '../../../../hooks/useSelectNetwork'

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

export interface BillsListMenuProps {
  onHandleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSetSortOption: (value: string) => void
  activeOption?: string
  query: string
  harvestAll?: React.ReactNode
  bills?: Bills[]
  showOnlyDiscount: boolean
  setShowOnlyDiscount: (value: boolean) => void
  showAvailable: boolean
  setShowAvailable: (value: boolean) => void
}

const BillsListMenu: React.FC<BillsListMenuProps> = ({
  onHandleQueryChange,
  onSetSortOption,
  query,
  activeOption,
  bills,
  showOnlyDiscount,
  setShowOnlyDiscount,
  showAvailable,
  setShowAvailable,
}) => {
  const [toggled, setToggled] = useState(false)
  const inputEl = useRef(null)
  const { t } = useTranslation()
  const { switchNetwork } = useSelectNetwork()
  const { chainId } = useActiveWeb3React()

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
      <Flex>
        <Toggle
          size="md"
          labels={[t('Available'), t('Sold out')]}
          onClick={() => setShowAvailable(!showAvailable)}
          checked={!showAvailable}
        />
      </Flex>
      <Flex style={{ minWidth: '140px', gridArea: 'expired' }}>
        <Text mr="12.5px">{t('Discount')}</Text>
        <Checkbox checked={showOnlyDiscount} onClick={() => setShowOnlyDiscount(!showOnlyDiscount)} />
      </Flex>
      <NetworkButton switchNetwork={switchNetwork} chainId={chainId} t={t} />
    </ControlContainer>
  )
}

export default React.memo(BillsListMenu)
