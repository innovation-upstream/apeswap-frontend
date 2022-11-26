/** @jsxImportSource theme-ui */
import { Flex } from '@ape.swap/uikit'
import React, { useCallback, useEffect, useState } from 'react'
import { usePollBills, useBills, usePollUserBills, useSetBills, useLoadedUserBills } from 'state/bills/hooks'
import ListViewLayout from 'components/layout/ListViewLayout'
import Banner from 'components/Banner'
import { useTranslation } from 'contexts/Localization'
import UserBillViews from './components/UserBillViews'
import { BannerTypes } from 'components/Banner/types'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import ListView404 from 'components/ListView404'
import { AVAILABLE_CHAINS_ON_LIST_VIEW_PRODUCTS, LIST_VIEW_PRODUCTS } from 'config/constants/chains'
import FirstTimeCard from './components/UserBillViews/FirstTimeCard'
import BillsNav from './components/BillsNav'
import BillsListView from './components/BillsListView'
import useDebounce from '../../hooks/useDebounce'
import { AnimatePresence, motion } from 'framer-motion'

export enum BillsView {
  AVAILABLE_BILLS,
  YOUR_BILLS,
}

const Bills: React.FC = () => {
  useSetBills()
  usePollBills()
  usePollUserBills()
  const { chainId, account } = useActiveWeb3React()
  const bills = useBills()
  const { t } = useTranslation()
  const [billsView, setBillsView] = useState<BillsView>(BillsView.AVAILABLE_BILLS)
  const ownedBillsAmount = bills?.flatMap((bill) => (bill?.userOwnedBillsData ? bill?.userOwnedBillsData : [])).length

  const handleBillsViewChange = useCallback((newBillsView: BillsView) => {
    setBillsView(newBillsView)
  }, [])

  // logic used to prevent FirstTimeComponent to pop up abruptly
  const loadedUserBills = useLoadedUserBills()
  const [showFirstTimeCard, setShowFirstTimeCard] = useState(false)
  const debouncedShowCard = useDebounce(showFirstTimeCard, 1000)
  useEffect(() => {
    setShowFirstTimeCard(!account || (ownedBillsAmount === 0 && loadedUserBills))
  }, [account, ownedBillsAmount, loadedUserBills])

  return (
    <>
      <Flex
        mb="80px"
        sx={{
          position: 'relative',
          top: '30px',
          width: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItem: 'center',
        }}
      >
        <ListViewLayout>
          <Banner
            banner={`${chainId}-treasury-bills` as BannerTypes}
            title={t('Treasury Bills')}
            link="https://apeswap.gitbook.io/apeswap-finance/product-and-features/raise/treasury-bills"
            listViewBreak
            maxWidth={1130}
            titleColor="primaryBright"
          />
          {!AVAILABLE_CHAINS_ON_LIST_VIEW_PRODUCTS[LIST_VIEW_PRODUCTS.BILLS].includes(chainId) ? (
            <Flex sx={{ mt: '20px' }}>
              <ListView404 product={LIST_VIEW_PRODUCTS.BILLS} />
            </Flex>
          ) : (
            <>
              <AnimatePresence>
                {debouncedShowCard && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'fit-content' }}
                    exit={{ opacity: 0 }}
                    transition={{ opacity: { duration: 0.4 } }}
                    sx={{
                      position: 'relative',
                      width: '100%',
                      overflow: 'hidden',
                    }}
                  >
                    <Flex sx={{ mt: '20px' }}>
                      <FirstTimeCard />
                    </Flex>
                  </motion.div>
                )}
              </AnimatePresence>
              <BillsNav billsView={billsView} setBillsView={handleBillsViewChange} />
              {billsView === BillsView.AVAILABLE_BILLS ? (
                <BillsListView />
              ) : (
                <UserBillViews handleBillsViewChange={handleBillsViewChange} />
              )}
            </>
          )}
        </ListViewLayout>
      </Flex>
    </>
  )
}

export default React.memo(Bills)
