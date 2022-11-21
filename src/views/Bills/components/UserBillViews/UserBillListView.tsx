import React from 'react'
import { Flex, useMatchBreakpoints } from '@apeswapfinance/uikit'
import ListView from 'components/ListView'
import { Bills } from 'state/types'
import { ExtendedListViewProps } from 'components/ListView/types'
import ListViewContent from 'components/ListViewContent'
import { getBalanceNumber } from 'utils/formatBalance'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import Claim from '../Actions/Claim'
import VestedTimer from '../VestedTimer'
import BillModal from '../Modals'
import EmptyListComponent, { EmptyComponentType } from '../EmptyListComponent/EmptyListComponent'
import { BillsView } from '../../index'
import BillCard from './BillCard'
import ListViewContentMobile from '../../../../components/ListViewContent/ListViewContentMobile'

const UserBillListView: React.FC<{
  bills: Bills[]
  showClaimed?: boolean
  listView: boolean
  handleBillsViewChange: (view: BillsView) => void
  noResults: boolean
}> = ({ bills, showClaimed, handleBillsViewChange, noResults, listView }) => {
  const { isXl, isLg, isXxl } = useMatchBreakpoints()
  const { chainId } = useActiveWeb3React()
  const { t } = useTranslation()
  const isMobile = !isLg && !isXl && !isXxl
  const billsListView = bills.flatMap((bill) => {
    const ownedBills = bill?.userOwnedBillsData
    const { token, quoteToken, earnToken } = bill
    return ownedBills.flatMap((ownedBill) => {
      if (!showClaimed && parseFloat(ownedBill.pendingRewards) === 0 && parseFloat(ownedBill.payout) === 0) {
        return []
      }
      const pending = getBalanceNumber(new BigNumber(ownedBill.payout), bill?.earnToken?.decimals)?.toFixed(4)
      const pendingRewards = getBalanceNumber(
        new BigNumber(ownedBill.pendingRewards),
        bill?.earnToken?.decimals,
      )?.toFixed(4)
      return {
        tokens: { token1: token.symbol, token2: quoteToken.symbol, token3: earnToken.symbol },
        stakeLp: true,
        id: ownedBill.id,
        billArrow: true,
        title: (
          <ListViewContent
            title={bill.billType}
            value={bill.lpToken.symbol}
            width={isMobile ? 150 : 150}
            height={45}
            ml={10}
          />
        ),
        cardContent: (
          <>
            {isMobile ? (
              <ListViewContentMobile
                title={'Claimable'}
                value={pendingRewards}
                toolTip={`This is the amount of tokens that have vested and available to claim.`}
                toolTipPlacement={'bottomLeft'}
                toolTipTransform={'translate(29%, 0%)'}
              />
            ) : (
              <>
                <ListViewContent
                  title={t('Claimable')}
                  value={pendingRewards}
                  width={isMobile ? 120 : 165}
                  ml={20}
                  height={52.5}
                  toolTip={t('This is the amount of tokens that have vested and available to claim.')}
                  toolTipPlacement="bottomLeft"
                  toolTipTransform="translate(0, 65%)"
                />
                <ListViewContent
                  title={t('Pending')}
                  value={pending}
                  width={isMobile ? 120 : 160}
                  height={52.5}
                  toolTip={t('This is the amount of unvested tokens that cannot be claimed yet.')}
                  toolTipPlacement="bottomLeft"
                  toolTipTransform="translate(0, 65%)"
                />
                <VestedTimer lastBlockTimestamp={ownedBill.lastBlockTimestamp} vesting={ownedBill.vesting} />
                <>
                  <Flex alignItems="center" style={{ height: '100%' }}>
                    <Claim
                      billAddress={bill.contractAddress[chainId]}
                      billIds={[ownedBill.id]}
                      buttonSize={100}
                      pendingRewards={ownedBill?.pendingRewards}
                      margin={'10px'}
                    />
                  </Flex>
                  <Flex alignItems="center" style={{ height: '100%' }}>
                    <BillModal buttonText={t('VIEW')} bill={bill} billId={ownedBill.id} buttonSize={100} />
                  </Flex>
                </>
              </>
            )}
          </>
        ),
        expandedContentSize: 135,
        expandedContent: isMobile && (
          <Flex flexDirection="column" alignItems="center" style={{ height: '110px', width: '100%' }}>
            <Flex alignItems="center" justifyContent="center">
              <Claim
                billAddress={bill.contractAddress[chainId]}
                billIds={[ownedBill.id]}
                pendingRewards={ownedBill?.pendingRewards}
                margin={'0'}
              />
            </Flex>
            <Flex alignItems="center" mt="20px">
              <BillModal buttonText={t('VIEW')} bill={bill} billId={ownedBill.id} buttonSize={200} />
            </Flex>
          </Flex>
        ),
      } as ExtendedListViewProps
    })
  })
  return (
    <>
      {!listView ? (
        <BillCard bills={bills} showClaimed={showClaimed} />
      ) : billsListView?.length ? (
        <ListView listViews={billsListView?.reverse()} />
      ) : (
        <EmptyListComponent
          type={noResults ? EmptyComponentType.NO_RESULTS : EmptyComponentType.USER_BILLS}
          handleBillsViewChange={handleBillsViewChange}
        />
      )}
    </>
  )
}

export default React.memo(UserBillListView)
