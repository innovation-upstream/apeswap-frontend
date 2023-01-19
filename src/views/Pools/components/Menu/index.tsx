/** @jsxImportSource theme-ui */
import React, { useState } from 'react'
import { Flex, Select, SelectItem, Svg, Text } from '@ape.swap/uikit'
import { Checkbox } from '@ape.swap/uikit'
import { ToggleWrapper } from 'components/ListViewMenu/styles'
import { useTranslation } from 'contexts/Localization'
import { ListViewProps } from './types'
import SearchInput from './SearchInput'
import { ClaimAllWrapper, LabelWrapper, styles } from './styles'
import { OPTIONS, TOKEN_OPTIONS } from './constants'
import HarvestAll from '../Actions/HarvestAll'
import useIsMobile from 'hooks/useIsMobile'
import { AnimatePresence, motion } from 'framer-motion'
import PoolTabButtons from './PoolTabButtons'

const PoolMenu: React.FC<ListViewProps> = ({
  onHandleQueryChange,
  onSetSortOption,
  onSetTokenOption,
  query,
  activeTokenOption,
  activeOption,
  pools,
  onSetStake,
  stakedOnly,
}) => {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const [expanded, setExpended] = useState(false)

  const sousIds = pools.map((pool) => {
    return pool.sousId
  })
  return (
    <Flex sx={styles.menuContainer}>
      {isMobile ? (
        <Flex sx={styles.mobileContainer}>
          <Flex sx={{ mb: '15px' }}>
            <SearchInput onChange={onHandleQueryChange} value={query} />
            <Flex sx={styles.expandedButton} onClick={() => setExpended(!expanded)}>
              <Svg icon="MenuSettings" width="18px" />
            </Flex>
          </Flex>
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'fit-content' }}
                exit={{ opacity: 0 }}
                transition={{ opacity: { duration: 0.4 } }}
                sx={{
                  position: 'relative',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  mb: '15px',
                }}
              >
                <Flex sx={styles.mobileRow}>
                  <Flex sx={{ width: '48%' }}>
                    <Select
                      size="xsm"
                      onChange={(e) => onSetSortOption(e.target.value)}
                      active={activeOption}
                      sx={styles.select}
                    >
                      {OPTIONS.map((option) => {
                        return (
                          <SelectItem size="xsm" value={option.value} key={option.label}>
                            <Text>{t(option.label)}</Text>
                          </SelectItem>
                        )
                      })}
                    </Select>
                  </Flex>
                  <Flex sx={{ width: '48%' }}>
                    <Select
                      size="xsm"
                      onChange={(e) => onSetTokenOption(e.target.value)}
                      active={activeTokenOption}
                      sx={styles.select}
                    >
                      {TOKEN_OPTIONS.map((option) => {
                        return (
                          <SelectItem size="xsm" value={option.value} key={option.label}>
                            <Text>{t(option.label)}</Text>
                          </SelectItem>
                        )
                      })}
                    </Select>
                  </Flex>
                  <Flex sx={{ width: '100%', mt: '15px' }}>
                    <PoolTabButtons />
                    <Flex sx={{ width: '50%', justifyContent: 'center' }}>
                      <ToggleWrapper onClick={() => onSetStake(!stakedOnly)}>
                        <Checkbox checked={stakedOnly} onChange={() => onSetStake(!stakedOnly)} />
                        <Text sx={styles.stakedText}> {t('Staked')} </Text>
                      </ToggleWrapper>
                    </Flex>
                  </Flex>
                </Flex>
              </motion.div>
            )}
          </AnimatePresence>
          <ClaimAllWrapper>
            <HarvestAll sousIds={sousIds} />
          </ClaimAllWrapper>
        </Flex>
      ) : (
        <Flex sx={{ width: '100%', justifyContent: 'space-between' }}>
          <LabelWrapper>
            <Text sx={styles.searchText}>{t('Search')}</Text>
            <SearchInput onChange={onHandleQueryChange} value={query} />
          </LabelWrapper>
          <Flex sx={{ minWidth: '135px', ml: '10px' }}>
            <Select
              size="xsm"
              onChange={(e) => onSetSortOption(e.target.value)}
              active={activeOption}
              sx={styles.select}
            >
              {OPTIONS.map((option) => {
                return (
                  <SelectItem size="xsm" value={option.value} key={option.label}>
                    <Text>{t(option.label)}</Text>
                  </SelectItem>
                )
              })}
            </Select>
          </Flex>
          <Flex sx={{ minWidth: '115px', ml: '10px' }}>
            <Select
              size="xsm"
              onChange={(e) => onSetTokenOption(e.target.value)}
              active={activeTokenOption}
              sx={styles.select}
            >
              {TOKEN_OPTIONS.map((option) => {
                return (
                  <SelectItem size="xsm" value={option.value} key={option.label}>
                    <Text>{t(option.label)}</Text>
                  </SelectItem>
                )
              })}
            </Select>
          </Flex>
          <Flex sx={{ minWidth: '140px' }}>
            <PoolTabButtons />
          </Flex>
          <Flex sx={{ minWidth: '100px', justifyContent: 'center' }}>
            <ToggleWrapper onClick={() => onSetStake(!stakedOnly)}>
              <Checkbox checked={stakedOnly} onChange={() => onSetStake(!stakedOnly)} />
              <Text sx={styles.stakedText}> {t('Staked')} </Text>
            </ToggleWrapper>
          </Flex>
          <Flex sx={{ width: '180px', minWidth: '130px' }}>
            <HarvestAll sousIds={sousIds} />
          </Flex>
        </Flex>
      )}
    </Flex>
  )
}

export default React.memo(PoolMenu)
