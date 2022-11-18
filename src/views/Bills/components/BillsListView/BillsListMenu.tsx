/** @jsxImportSource theme-ui */
import React, { useState } from 'react'
import { Checkbox, Flex, Input, Select, SelectItem, Svg, Text, useMatchBreakpoints } from '@ape.swap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useTranslation } from 'contexts/Localization'
import { ControlContainer, SearchText, styles } from './styles'
import { NetworkButton, Toggle } from '@ape.swap/uikit'
import useSelectNetwork from '../../../../hooks/useSelectNetwork'
import { AVAILABLE_CHAINS_ON_PRODUCTS } from 'config/constants/chains'

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

export const SORT_OPTIONS = [
  {
    label: 'Discount',
    value: 'discount',
  },
  {
    label: 'Vesting Term',
    value: 'vesting',
  },
  {
    label: 'Price',
    value: 'price',
  },
  {
    label: 'New',
    value: 'new',
  },
]

export interface BillsListMenuProps {
  onHandleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  setFilterOption: (value: string) => void
  filterOption?: string
  setSortOption: (value: string) => void
  sortOption: string
  query: string
  harvestAll?: React.ReactNode
  showOnlyDiscount: boolean
  setShowOnlyDiscount: (value: boolean) => void
  showAvailable: boolean
  setShowAvailable: (value: boolean) => void
}

const BillsListMenu: React.FC<BillsListMenuProps> = ({
  onHandleQueryChange,
  setFilterOption,
  filterOption,
  setSortOption,
  sortOption,
  query,
  showOnlyDiscount,
  setShowOnlyDiscount,
  showAvailable,
  setShowAvailable,
}) => {
  const { t } = useTranslation()
  const { switchNetwork } = useSelectNetwork()
  const { chainId } = useActiveWeb3React()
  const { isLg, isXl, isXxl } = useMatchBreakpoints()
  const isMobile = !isLg && !isXl && !isXxl
  const [expanded, setExpended] = useState<boolean>(false)

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
              <Flex sx={{ marginLeft: '15px', marginTop: '15px' }}>
                <NetworkButton
                  switchNetwork={switchNetwork}
                  chainId={chainId}
                  t={t}
                  supportedChains={AVAILABLE_CHAINS_ON_PRODUCTS['bills']}
                />
              </Flex>
            </Flex>
          )}
          <Flex sx={{ width: '100%', justifyContent: 'space-around', marginTop: '15px' }}>
            <Flex>
              <Toggle
                size="sm"
                labels={[t('Available'), t('Sold out')]}
                onClick={() => setShowAvailable(!showAvailable)}
                checked={!showAvailable}
                sx={{ height: '36px', alignItems: 'center' }}
              />
            </Flex>
            <Flex sx={{ alignItems: 'center' }}>
              <Checkbox checked={showOnlyDiscount} onClick={() => setShowOnlyDiscount(!showOnlyDiscount)} />
              <Text ml="15px" size="14px" weight={700} color="success">
                {t('Discount')}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <>
          <Flex>
            <SearchText bold mr="15px">
              {t('Search')}
            </SearchText>
            <Input value={query} onChange={onHandleQueryChange} icon="search" sx={styles.input} />
          </Flex>
          <Flex>
            <Select
              size="xsm"
              onChange={(e) => setSortOption(e.target.value)}
              active={sortOption}
              sx={{ height: '36px', display: 'flex', width: '145px' }}
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
                  <SelectItem size="xsm" value={option.value} key={option.label}>
                    <Text>{t(option.label)}</Text>
                  </SelectItem>
                )
              })}
            </Select>
          </Flex>
          <Flex>
            <Toggle
              size="sm"
              labels={[t('Available'), t('Sold out')]}
              onClick={() => setShowAvailable(!showAvailable)}
              checked={!showAvailable}
              sx={{ height: '36px', alignItems: 'center' }}
            />
          </Flex>
          <Flex sx={{ alignItems: 'center' }}>
            <Checkbox checked={showOnlyDiscount} onClick={() => setShowOnlyDiscount(!showOnlyDiscount)} />
            <Text ml="15px" size="14px" weight={700} color="success">
              {t('Discount')}
            </Text>
          </Flex>
          <NetworkButton
            switchNetwork={switchNetwork}
            chainId={chainId}
            t={t}
            supportedChains={AVAILABLE_CHAINS_ON_PRODUCTS['bills']}
          />
        </>
      )}
    </ControlContainer>
  )
}

export default React.memo(BillsListMenu)
