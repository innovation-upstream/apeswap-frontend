/** @jsxImportSource theme-ui */
import React, { useCallback, useState } from 'react'
import { Checkbox, Flex, Input, Svg, Text, useMatchBreakpoints, Toggle } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import { styles } from './styles'
import MenuSelect from './MenuSelect'
import { AnimatePresence, motion } from 'framer-motion'
import { ListMenuProps } from './types'
import { useHistory, useRouteMatch } from 'react-router-dom'

const ListViewMenu: React.FC<ListMenuProps> = ({
  query,
  onHandleQueryChange,
  setFilterOption,
  filterOption,
  setSortOption,
  sortOption,
  checkboxLabel,
  showOnlyCheckbox,
  setShowOnlyCheckbox,
  toogleLabels,
  filterOptions,
  sortOptions,
  actionButton,
}) => {
  const { t } = useTranslation()
  const { isLg, isXl, isXxl } = useMatchBreakpoints()
  const isMobile = !isLg && !isXl && !isXxl
  const [expanded, setExpended] = useState(false)
  const { url, isExact } = useRouteMatch()
  const history = useHistory()

  const handleToogle = useCallback(() => {
    if (isExact) {
      history.push(`${url}/history`)
    } else {
      history.push(url)
    }
  }, [history, isExact, url])

  return (
    <Flex sx={styles.menuContainer}>
      {isMobile ? (
        <Flex sx={styles.mobileContainer}>
          <Flex>
            <Text sx={styles.searchText}>{t('Search')}</Text>
            <Input value={query} onChange={onHandleQueryChange} icon="search" sx={styles.input} />
            <Flex sx={styles.expandedButton} onClick={() => setExpended(!expanded)}>
              <Svg icon="MenuSettings" width="18px" />
            </Flex>
          </Flex>
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'fit-content' }}
                transition={{ delay: 0.1 }}
                exit={{ opacity: 0 }}
                sx={{
                  position: 'relative',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <Flex sx={styles.mobileRow}>
                  <Flex sx={styles.inputContainer} pr={3}>
                    <MenuSelect selectedOption={sortOption} setOption={setSortOption} options={sortOptions} />
                  </Flex>
                  <Flex sx={styles.inputContainer} pl={3}>
                    <MenuSelect selectedOption={filterOption} setOption={setFilterOption} options={filterOptions} />
                  </Flex>
                </Flex>
                <Flex sx={styles.mobileRow}>
                  <Flex>
                    <Toggle
                      size="sm"
                      labels={[t(`${toogleLabels[0]}`), t(`${toogleLabels[1]}`)]}
                      onClick={handleToogle}
                      checked={!isExact}
                      sx={{ height: '36px', alignItems: 'center' }}
                    />
                  </Flex>
                  <Flex sx={{ alignItems: 'center' }}>
                    <Checkbox checked={showOnlyCheckbox} onClick={() => setShowOnlyCheckbox(!showOnlyCheckbox)} />
                    <Text ml="10px" size="14px" weight={700} color="success">
                      {t(`${checkboxLabel}`)}
                    </Text>
                  </Flex>
                </Flex>
              </motion.div>
            )}
          </AnimatePresence>
          <Flex sx={styles.mobileRow}>
            <Flex sx={{ width: '100%' }}>
              {/* replace this in bills
                    '& span': { width: '100%', textAlign: 'left' }
                    <NetworkButton
                      switchNetwork={switchNetwork}
                      chainId={chainId}
                      t={t}
                      supportedChains={AVAILABLE_CHAINS_ON_LIST_VIEW_PRODUCTS[LIST_VIEW_PRODUCTS.BILLS]}
                    />
                    */}
              {actionButton}
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <>
          <Flex>
            <Text sx={styles.searchText}>{t('Search')}</Text>
            <Input value={query} onChange={onHandleQueryChange} icon="search" sx={styles.input} />
          </Flex>
          {sortOption && (
            <Flex sx={{ minWidth: '100px' }}>
              <MenuSelect selectedOption={sortOption} setOption={setSortOption} options={sortOptions} />
            </Flex>
          )}
          {filterOption && (
            <Flex sx={{ minWidth: '100px' }}>
              <MenuSelect selectedOption={filterOption} setOption={setFilterOption} options={filterOptions} />
            </Flex>
          )}
          <Flex sx={{ minWidth: '150px' }}>
            <Toggle
              size="sm"
              labels={[t(`${toogleLabels[0]}`), t(`${toogleLabels[1]}`)]}
              onClick={handleToogle}
              checked={!isExact}
              sx={{
                height: '36px',
                alignItems: 'center',
                width: '100%',
                '& div': { width: '75px', textAlign: 'center' },
              }}
            />
          </Flex>
          <Flex
            sx={{ alignItems: 'center', '&: hover': { cursor: 'pointer' } }}
            onClick={() => setShowOnlyCheckbox(!showOnlyCheckbox)}
          >
            <Checkbox checked={showOnlyCheckbox} />
            <Text ml="10px" size="14px" weight={700} color="success">
              {t(`${checkboxLabel}`)}
            </Text>
          </Flex>
          <Flex>
            {/* replace this in bills also add this:
            '& span': { width: '100%', textAlign: 'left' }

                    <NetworkButton
                      switchNetwork={switchNetwork}
                      chainId={chainId}
                      t={t}
                      supportedChains={AVAILABLE_CHAINS_ON_LIST_VIEW_PRODUCTS[LIST_VIEW_PRODUCTS.BILLS]}
                    />
                    */}
            {actionButton}
          </Flex>
        </>
      )}
    </Flex>
  )
}

export default React.memo(ListViewMenu)
