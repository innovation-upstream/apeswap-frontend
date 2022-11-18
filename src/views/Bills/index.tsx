/** @jsxImportSource theme-ui */
import { Flex } from '@ape.swap/uikit'
import React, { useCallback, useState } from 'react'
import { usePollBills, useBills, usePollUserBills, useSetBills } from 'state/bills/hooks'
import ListViewLayout from 'components/layout/ListViewLayout'
import Banner from 'components/Banner'
import { useTranslation } from 'contexts/Localization'
import UserBillViews from './components/UserBillViews'
import { BannerTypes } from 'components/Banner/types'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import ListView404 from 'components/ListView404'
import { AVAILABLE_CHAINS_ON_PRODUCTS } from 'config/constants/chains'
import FirstTimeCard from './components/UserBillViews/FirstTimeCard'
import BillsNav from './components/BillsNav'
import BillsListView from './components/BillsListView'

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
  const [billsView, setBillsView] = useState<BillsView>(BillsView.YOUR_BILLS)
  const ownedBillsAmount = bills?.flatMap((bill) => (bill?.userOwnedBillsData ? bill?.userOwnedBillsData : [])).length

  const handleBillsViewChange = useCallback((newBillsView: BillsView) => {
    setBillsView(newBillsView)
  }, [])

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
          {!AVAILABLE_CHAINS_ON_PRODUCTS['bills'].includes(chainId) ? (
            <Flex sx={{ mt: '20px' }}>
              <ListView404 product="bills" />
            </Flex>
          ) : (
            <>
              {!account || ownedBillsAmount === 0 ? (
                <Flex sx={{ mt: '20px' }}>
                  <FirstTimeCard />
                </Flex>
              ) : null}
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
