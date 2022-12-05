/** @jsxImportSource theme-ui */
import React, { useCallback, useMemo, useState } from 'react'
import { Flex, InfoIcon, TooltipBubble, useMatchBreakpoints } from '@ape.swap/uikit'
import ListView from 'components/ListViewV2'
import { Bills } from 'state/types'
import UnlockButton from 'components/UnlockButton'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { ExtendedListViewProps } from 'components/ListView/types'
import getTimePeriods from 'utils/getTimePeriods'
import { useTranslation } from 'contexts/Localization'
import BigNumber from 'bignumber.js'
import { MainContainer } from './styles'
import BillModal from '../Modals'
import ProjectLinks from '../UserBillViews/ProjectLinks'
import BillsListMenu from './BillsListMenu'
import { useBills } from '../../../../state/bills/hooks'
import { useSetZapOutputList } from 'state/zap/hooks'
import EmptyListComponent, { EmptyComponentType } from '../EmptyListComponent/EmptyList'
import ListViewContentMobile from 'components/ListViewV2/ListViewContentMobile'
import orderBy from 'lodash/orderBy'
import ListViewContent from 'components/ListViewV2/ListViewContent'
import { LpTypeVariants } from 'components/ListViewV2/types'

const BillsListView: React.FC = () => {
  const bills = useBills()
  const { account, chainId } = useActiveWeb3React()
  const { t } = useTranslation()
  const { isLg, isXl, isXxl } = useMatchBreakpoints()
  const isSmall = !isXxl
  const isMobile = !isLg && !isXl && !isXxl
  const [query, setQuery] = useState('')
  const [filterOption, setFilterOption] = useState('filter')
  const [sortOption, setSortOption] = useState('sort')
  const [showOnlyDiscount, setShowOnlyDiscount] = useState(false)
  const [showAvailable, setShowAvailable] = useState(true)
  const noResults = !!query || filterOption !== 'all' || showOnlyDiscount

  const isSoldOut = useCallback(
    (bill: Bills) => {
      const { earnToken, maxTotalPayOut, totalPayoutGiven, earnTokenPrice } = bill
      const available = new BigNumber(maxTotalPayOut)
        ?.minus(new BigNumber(totalPayoutGiven))
        ?.div(new BigNumber(10).pow(earnToken.decimals[chainId]))

      const threshold = new BigNumber(11).div(earnTokenPrice)
      return available.lte(threshold)
    },
    [chainId],
  )

  const hasDiscount = useCallback((bill: Bills) => {
    const { discount } = bill
    return new BigNumber(discount).gt(0)
  }, [])

  const sortBills = useCallback(
    (billsToSort: Bills[]) => {
      switch (sortOption) {
        case 'discount':
          return orderBy(billsToSort, (bill: Bills) => parseFloat(bill.discount), 'desc')
        case 'vesting':
          return orderBy(billsToSort, (bill: Bills) => parseFloat(bill.vestingTime), 'asc')
        case 'price':
          return orderBy(billsToSort, (bill: Bills) => parseFloat(bill.priceUsd), 'asc')
        case 'new':
          return orderBy(billsToSort, (bill: Bills) => bill.index, 'desc')
        default:
          return billsToSort
      }
    },
    [sortOption],
  )

  const billsToRender = useMemo((): Bills[] => {
    let billsToReturn = []
    bills?.forEach((bill) => {
      if (bill.inactive) return
      const disabled = isSoldOut(bill)
      const discount = hasDiscount(bill)
      if (showAvailable && disabled) return
      if (!showAvailable && !disabled) return
      if (showOnlyDiscount && !discount) return
      billsToReturn.push(bill)
    })
    if (query) {
      billsToReturn = billsToReturn?.filter((bill) => {
        return bill.lpToken.symbol.toUpperCase().includes(query.toUpperCase())
      })
    }
    if (filterOption === 'bananaBill') {
      billsToReturn = billsToReturn?.filter((bill) => bill.billType.toUpperCase() === 'BANANA Bill'.toUpperCase())
    }
    if (filterOption === 'jungleBill') {
      billsToReturn = billsToReturn?.filter((bill) => bill.billType.toUpperCase() === 'JUNGLE Bill'.toUpperCase())
    }
    return sortBills(billsToReturn)
  }, [bills, isSoldOut, query, showAvailable, filterOption, showOnlyDiscount, hasDiscount, sortBills])

  const billsListView = billsToRender.map((bill) => {
    const { earnToken, token, quoteToken, maxTotalPayOut, totalPayoutGiven, earnTokenPrice } = bill
    const vestingTime = getTimePeriods(parseInt(bill.vestingTime), true)
    const available = new BigNumber(maxTotalPayOut)
      ?.minus(new BigNumber(totalPayoutGiven))
      ?.div(new BigNumber(10).pow(earnToken.decimals[chainId]))

    const threshold = new BigNumber(11).div(earnTokenPrice)
    const disabled = new BigNumber(available).lte(threshold)

    const displayAvailable = available.toFixed(available.lte(10000000) ? 2 : 0)

    return {
      tokens: { token1: token.symbol, token2: quoteToken.symbol, token3: earnToken.symbol },
      stakeLp: true,
      id: bill.index,
      billArrow: true,
      title: <ListViewContent tag={LpTypeVariants.APE} value={bill.lpToken.symbol} width={150} height={45} ml={0} />,
      infoContent: isSmall && <ProjectLinks website={bill?.projectLink} twitter={bill?.twitter} t={t} isMobile />,
      ttWidth: isSmall && '200px',
      toolTipIconWidth: '15px',
      toolTipStyle: isSmall && { marginRight: '10px' },
      infoContentPosition: 'translate(10%, 0%)',
      titleContainerWidth: 260,
      cardContent: isMobile ? (
        <ListViewContentMobile
          title={'Discount'}
          value={disabled ? 'N/A' : `${bill?.discount}%`}
          valueColor={disabled ? null : parseFloat(bill?.discount) < 0 ? '#DF4141' : '#38A611'}
          toolTip={`This is the percentage discount relative to the token's current market price.`}
          toolTipPlacement={'bottomLeft'}
          toolTipTransform={'translate(23%, 0%)'}
        />
      ) : (
        <Flex style={{ width: '100%', alignItems: 'center', justifyContent: 'flex-end' }}>
          <ListViewContent
            title={t('Price')}
            value={disabled ? 'N/A' : `$${bill?.priceUsd}`}
            width={isSmall ? 130 : 130}
            ml={isSmall ? 10 : 15}
            height={52.5}
            toolTip={t('This is the current discounted price of the tokens.')}
            toolTipPlacement="bottomLeft"
            toolTipTransform="translate(11%, 0%)"
          />
          <ListViewContent
            title={t('Discount')}
            valueColor={disabled ? null : parseFloat(bill?.discount) < 0 ? '#DF4141' : '#38A611'}
            value={disabled ? 'N/A' : `${bill?.discount}%`}
            width={isSmall ? 75 : 90}
            ml={isSmall ? 10 : 15}
            height={52.5}
            toolTip={t("This is the percentage discount relative to the token's current market price.")}
            toolTipPlacement="bottomLeft"
            toolTipTransform={'translate(23%, 0%)'}
          />
          <ListViewContent
            title={t('Vesting Term')}
            value={vestingTime.days ? `${vestingTime.days} days` : 'NaN'}
            width={isSmall ? 105 : 105}
            ml={isSmall ? 10 : 15}
            height={52.5}
            toolTip={t('This is how long it will take for all tokens in the Bill to fully vest.')}
            toolTipPlacement={isSmall ? 'bottomRight' : 'bottomLeft'}
            toolTipTransform={isSmall ? 'translate(13%, 0%)' : 'translate(39%, 0%)'}
          />
          <ListViewContent
            title={t('Available Tokens')}
            value={disabled ? '0' : parseFloat(displayAvailable).toLocaleString(undefined)}
            width={isSmall ? 150 : 150}
            ml={isSmall ? 10 : 15}
            height={52.5}
            toolTip={t('This is the amount of available tokens for purchase.')}
            toolTipPlacement={isSmall ? 'bottomRight' : 'bottomLeft'}
            toolTipTransform={isSmall ? 'translate(13%, 0%)' : 'translate(49%, 0%)'}
          />
          {!isSmall && (
            <>
              <Flex style={{ height: '100%', alignItems: 'center', minWidth: '145px' }}>
                {account ? (
                  <BillModal
                    bill={bill}
                    buttonText={disabled ? t('SOLD OUT') : t('BUY')}
                    id={bill.index}
                    buyFlag
                    disabled={!bill.discount || bill.discount.includes('NaN') || disabled}
                  />
                ) : (
                  <UnlockButton sx={{ width: '100%' }} />
                )}
              </Flex>
              <Flex sx={{ alignItems: 'center', height: '100%', marginLeft: '20px' }}>
                <TooltipBubble
                  placement="bottomRight"
                  transformTip="translate(8%, -2%)"
                  body={<ProjectLinks website={bill?.projectLink} twitter={bill?.twitter} t={t} />}
                >
                  <InfoIcon width="20px" />
                </TooltipBubble>
              </Flex>
            </>
          )}
        </Flex>
      ),
      expandedContentSize: 150,
      expandedContent: isSmall && (
        <Flex sx={{ alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
          {account ? (
            <Flex sx={{ width: '100%', justifyContent: 'center', flexWrap: 'wrap' }}>
              {isMobile && (
                <Flex sx={{ flexWrap: 'wrap', padding: '0 10px 10px 10px', width: '100%' }}>
                  <ListViewContentMobile
                    title={'Price'}
                    value={disabled ? 'N/A' : `$${bill?.priceUsd}`}
                    toolTip={`This is the current discounted price of the tokens.`}
                    toolTipPlacement={'bottomLeft'}
                    toolTipTransform={'translate(10%, 0%)'}
                  />
                  <ListViewContentMobile
                    title={'Vesting Term'}
                    value={disabled ? 'N/A' : vestingTime.days ? `${vestingTime.days} days` : 'NaN'}
                    toolTip={`This is how long it will take for all tokens in the Bill to fully vest.`}
                    toolTipPlacement={'bottomLeft'}
                    toolTipTransform={'translate(39%, 0%)'}
                  />
                  <ListViewContentMobile
                    title={'Available Tokens'}
                    value={disabled ? '0' : parseFloat(displayAvailable).toLocaleString(undefined)}
                    toolTip={`This is the amount of available tokens for purchase.`}
                    toolTipPlacement={'bottomLeft'}
                    toolTipTransform={'translate(50%, 0%)'}
                  />
                </Flex>
              )}
              <Flex sx={{ width: '240px', justifyContent: 'center' }}>
                <BillModal
                  bill={bill}
                  buttonText={disabled ? t('SOLD OUT') : t('BUY')}
                  id={bill.index}
                  buyFlag
                  disabled={!bill.discount || bill.discount.includes('NaN') || disabled}
                  buttonSize={'100%'}
                />
              </Flex>
            </Flex>
          ) : (
            <Flex sx={{ width: '240px', justifyContent: 'center' }}>
              <UnlockButton sx={{ width: '100%' }} />
            </Flex>
          )}
        </Flex>
      ),
    } as ExtendedListViewProps
  })

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  // Set zap output list to match dual farms
  useSetZapOutputList(
    billsToRender.map((bill) => {
      return {
        currencyIdA: bill?.token.address[chainId],
        currencyIdB: bill?.quoteToken.address[chainId],
      }
    }),
  )

  return (
    <MainContainer>
      <BillsListMenu
        onHandleQueryChange={handleChangeQuery}
        setFilterOption={setFilterOption}
        filterOption={filterOption}
        setSortOption={setSortOption}
        sortOption={sortOption}
        query={query}
        showOnlyDiscount={showOnlyDiscount}
        setShowOnlyDiscount={setShowOnlyDiscount}
        showAvailable={showAvailable}
        setShowAvailable={setShowAvailable}
      />
      <Flex flexDirection="column" sx={{ padding: '20px 0 50px 0' }}>
        {billsListView?.length ? (
          <ListView listViews={billsListView} />
        ) : (
          <EmptyListComponent type={noResults ? EmptyComponentType.NO_RESULTS : EmptyComponentType.AVAILABLE_BILLS} />
        )}
      </Flex>
    </MainContainer>
  )
}

export default React.memo(BillsListView)
