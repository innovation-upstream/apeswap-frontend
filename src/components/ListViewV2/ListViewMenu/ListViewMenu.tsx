/** @jsxImportSource theme-ui */
import React, { useCallback, useState } from 'react'
import { Checkbox, Flex, Input, Svg, Text, Toggle } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import { dynamicStyles, styles } from './styles'
import MenuSelect from './MenuSelect'
import { AnimatePresence, motion } from 'framer-motion'
import { ListMenuProps } from './types'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { Image, useColorMode } from 'theme-ui'

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
  showMonkeyImage,
}) => {
  const { t } = useTranslation()
  const [expanded, setExpended] = useState(false)
  const { url, isExact } = useRouteMatch()
  const history = useHistory()
  const [colorMode] = useColorMode()

  const handleToogle = useCallback(() => {
    if (isExact) {
      history.push(`${url}/history`)
    } else {
      history.push(url)
    }
  }, [history, isExact, url])

  return (
    <Flex sx={dynamicStyles.menuContainer({ showMonkeyImage })}>
      <>
        <Flex>
          <Text sx={styles.searchText}>{t('Search')}</Text>
          <Input value={query} onChange={onHandleQueryChange} icon="search" sx={styles.searchInput} />
          <Flex sx={styles.expandedButton} onClick={() => setExpended(!expanded)}>
            <Svg icon="MenuSettings" width="18px" />
          </Flex>
        </Flex>
        <Flex sx={{ ...styles.onlyMobile, width: '100%' }}>
          {expanded && (
            <AnimatePresence>
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
                <Flex sx={styles.container}>
                  {sortOption && (
                    <Flex sx={styles.selectContainer} pr={filterOption && 3}>
                      <MenuSelect selectedOption={sortOption} setOption={setSortOption} options={sortOptions} />
                    </Flex>
                  )}
                  {filterOption && (
                    <Flex sx={styles.selectContainer} pl={sortOption && 3}>
                      <MenuSelect selectedOption={filterOption} setOption={setFilterOption} options={filterOptions} />
                    </Flex>
                  )}
                </Flex>
                <Flex sx={styles.container}>
                  <Flex>
                    <Toggle
                      size="sm"
                      labels={[t(`${toogleLabels[0]}`), t(`${toogleLabels[1]}`)]}
                      onClick={handleToogle}
                      checked={!isExact}
                      sx={{ height: '36px', alignItems: 'center' }}
                    />
                  </Flex>
                  <Flex sx={{ alignItems: 'center' }} onClick={() => setShowOnlyCheckbox(!showOnlyCheckbox)}>
                    <Checkbox checked={showOnlyCheckbox} />
                    <Text ml="10px" size="14px" weight={700} color="success">
                      {t(`${checkboxLabel}`)}
                    </Text>
                  </Flex>
                </Flex>
              </motion.div>
            </AnimatePresence>
          )}
        </Flex>
        {sortOption && (
          <Flex sx={{ minWidth: '100px', ...styles.onlyDesktop }}>
            <MenuSelect selectedOption={sortOption} setOption={setSortOption} options={sortOptions} />
          </Flex>
        )}
        {filterOption && (
          <Flex sx={{ minWidth: '100px', ...styles.onlyDesktop }}>
            <MenuSelect selectedOption={filterOption} setOption={setFilterOption} options={filterOptions} />
          </Flex>
        )}
        <Flex sx={{ minWidth: '150px', ...styles.onlyDesktop }}>
          <Toggle
            size="sm"
            labels={[t(`${toogleLabels[0]}`), t(`${toogleLabels[1]}`)]}
            onClick={handleToogle}
            checked={!isExact}
            sx={styles.toogle}
          />
        </Flex>
        <Flex
          sx={{ alignItems: 'center', '&: hover': { cursor: 'pointer' }, ...styles.onlyDesktop }}
          onClick={() => setShowOnlyCheckbox(!showOnlyCheckbox)}
        >
          <Checkbox checked={showOnlyCheckbox} />
          <Text ml="10px" size="14px" weight={700} color="success">
            {t(`${checkboxLabel}`)}
          </Text>
        </Flex>
        <Flex sx={styles.container}>
          <Flex sx={{ width: '100%' }}>{actionButton}</Flex>
        </Flex>
      </>
      {showMonkeyImage &&
        (colorMode === 'dark' ? (
          <Image src="/images/farm-night-farmer.svg" sx={styles.monkey} />
        ) : (
          <Image src="/images/farm-day-farmer.svg" sx={styles.monkey} />
        ))}
    </Flex>
  )
}

export default React.memo(ListViewMenu)
