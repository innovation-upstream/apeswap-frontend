/** @jsxImportSource theme-ui */
import React, { useState } from 'react'
import { Checkbox, Flex, Input, Svg, Text, useMatchBreakpoints } from '@ape.swap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useTranslation } from 'contexts/Localization'
import { SearchText, styles } from './styles'
import { NetworkButton, Toggle } from '@ape.swap/uikit'
import useSelectNetwork from 'hooks/useSelectNetwork'
import { AVAILABLE_CHAINS_ON_LIST_VIEW_PRODUCTS, LIST_VIEW_PRODUCTS } from 'config/constants/chains'
import { BillsListMenuProps, FILTER_OPTIONS, SORT_OPTIONS } from './types'
import MenuSelect from './MenuSelect'

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
  const [expanded, setExpended] = useState(false)

  return (
    <Flex sx={styles.menuContainer}>
      {isMobile ? (
        <Flex sx={styles.mobileContainer}>
          <Flex>
            <SearchText bold mr="15px">
              {t('Search')}
            </SearchText>
            <Input value={query} onChange={onHandleQueryChange} icon="search" sx={styles.input} />
            <Flex sx={styles.expandedButton} onClick={() => setExpended(!expanded)}>
              <Svg icon="MenuSettings" width="18px" />
            </Flex>
          </Flex>
          {expanded && (
            <Flex sx={styles.mobileRow}>
              <Flex sx={styles.inputContainer} pr={3}>
                <MenuSelect selectedOption={sortOption} setOption={setSortOption} options={SORT_OPTIONS} />
              </Flex>
              <Flex sx={styles.inputContainer} pl={3}>
                <MenuSelect selectedOption={filterOption} setOption={setFilterOption} options={FILTER_OPTIONS} />
              </Flex>
              <Flex sx={styles.networkWrapper}>
                <NetworkButton
                  switchNetwork={switchNetwork}
                  chainId={chainId}
                  t={t}
                  supportedChains={AVAILABLE_CHAINS_ON_LIST_VIEW_PRODUCTS[LIST_VIEW_PRODUCTS.BILLS]}
                />
              </Flex>
            </Flex>
          )}
          <Flex sx={styles.mobileRow}>
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
          <Flex sx={{ width: '145px' }}>
            <MenuSelect selectedOption={sortOption} setOption={setSortOption} options={SORT_OPTIONS} />
          </Flex>
          <Flex sx={{ width: '95px' }}>
            <MenuSelect selectedOption={filterOption} setOption={setFilterOption} options={FILTER_OPTIONS} />
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
            supportedChains={AVAILABLE_CHAINS_ON_LIST_VIEW_PRODUCTS[LIST_VIEW_PRODUCTS.BILLS]}
          />
        </>
      )}
    </Flex>
  )
}

export default React.memo(BillsListMenu)
