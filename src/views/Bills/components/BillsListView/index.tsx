/** @jsxImportSource theme-ui */
import React, { useCallback, useMemo, useState } from 'react'
import { Flex, InfoIcon, Text, TooltipBubble, useMatchBreakpoints } from '@ape.swap/uikit'
import ListView from 'components/ListView'
import { Bills as BillType, Bills } from 'state/types'
import UnlockButton from 'components/UnlockButton'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { ExtendedListViewProps } from 'components/ListView/types'
import ListViewContent from 'components/ListViewContent'
import getTimePeriods from 'utils/getTimePeriods'
import { useTranslation } from 'contexts/Localization'
import BigNumber from 'bignumber.js'
import { MainContainer } from './styles'
import BillModal from '../Modals'
import ProjectLinks from '../UserBillViews/ProjectLinks'
import BillsListMenu from './BillsListMenu'
import { useBills } from '../../../../state/bills/hooks'
import { useSetZapOutputList } from 'state/zap/hooks'
import { TitleText } from '../../../../components/ListViewContent/styles'
import { HelpIcon } from '@apeswapfinance/uikit'
import EmptyListComponent, { EmptyComponentType } from '../EmptyListComponent/EmptyListComponent'

const BillsListView: React.FC = () => {
  const bills = useBills()
  const { account, chainId } = useActiveWeb3React()
  const { t } = useTranslation()
  const { isLg, isXl, isXxl } = useMatchBreakpoints()
  const isMobile = !isXxl
  const isSmall = !isLg && !isXl && !isXxl
  const [query, setQuery] = useState('')
  const [filterOption, setFilterOption] = useState('all')
  const [sortOption, setSortOption] = useState('discount')
  const [showOnlyDiscount, setShowOnlyDiscount] = useState(false)
  const [showAvailable, setShowAvailable] = useState(true)
  const noResults = !!query || filterOption !== 'all' || showOnlyDiscount

  console.log(noResults)

  const isSoldOut = useCallback((bill: Bills) => {
    const { earnToken, maxTotalPayOut, totalPayoutGiven, earnTokenPrice } = bill
    const available = new BigNumber(maxTotalPayOut)
      ?.minus(new BigNumber(totalPayoutGiven))
      ?.div(new BigNumber(10).pow(earnToken.decimals))

    const threshold = new BigNumber(11).div(earnTokenPrice)
    return available.lte(threshold)
  }, [])

  const hasDiscount = useCallback((bill: Bills) => {
    const { discount } = bill
    return new BigNumber(discount).gt(0)
  }, [])

  const billsToRender = useMemo((): BillType[] => {
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
    return billsToReturn
  }, [bills, isSoldOut, query, showAvailable, filterOption, showOnlyDiscount, hasDiscount])

  const billsListView = billsToRender.map((bill) => {
    const { earnToken, token, quoteToken, maxTotalPayOut, totalPayoutGiven, earnTokenPrice } = bill
    const vestingTime = getTimePeriods(parseInt(bill.vestingTime), true)
    const available = new BigNumber(maxTotalPayOut)
      ?.minus(new BigNumber(totalPayoutGiven))
      ?.div(new BigNumber(10).pow(earnToken.decimals))

    const threshold = new BigNumber(11).div(earnTokenPrice)
    const disabled = new BigNumber(available).lte(threshold)

    const displayAvailable = available.toFixed(available.lte(10000000) ? 2 : 0)

    return {
      tokens: { token1: token.symbol, token2: quoteToken.symbol, token3: earnToken.symbol },
      stakeLp: true,
      id: bill.index,
      billArrow: true,
      title: <ListViewContent title={t(bill.billType)} value={bill.lpToken.symbol} width={150} height={45} ml={0} />,
      infoContent: isMobile && <ProjectLinks website={bill?.projectLink} twitter={bill?.twitter} t={t} isMobile />,
      ttWidth: isMobile && '200px',
      toolTipIconWidth: '15px',
      toolTipStyle: isMobile && { marginTop: '12px', marginRight: '10px' },
      infoContentPosition: 'translate(10%, 0%)',
      titleContainerWidth: 255,
      cardContent: isSmall ? (
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
          <TooltipBubble
            placement={'bottomLeft'}
            transformTip={parseFloat(bill?.discount) < 0 ? 'translate(25, 0%)' : 'translate(23%, 0%)'}
            body={<Flex>{t(`This is the percentage discount relative to the token's current market price.`)}</Flex>}
            width="180px"
          >
            <TitleText lineHeight={null} sx={{ display: 'flex' }}>
              {t('Discount')}
              <HelpIcon width="12px" ml="5px" />
            </TitleText>
          </TooltipBubble>
          <Text
            sx={{ color: disabled ? null : parseFloat(bill?.discount) < 0 ? '#DF4141' : '#38A611' }}
            weight={700}
            size="12px"
          >
            {!bill?.discount || bill?.discount === 'NaN' || disabled ? 'N/A' : `${bill?.discount}%`}
          </Text>
        </div>
      ) : (
        <Flex style={{ width: '100%', alignItems: 'center', justifyContent: 'flex-end' }}>
          <ListViewContent
            title={t('Price')}
            value={disabled ? 'N/A' : `$${bill?.priceUsd}`}
            width={isMobile ? 130 : 130}
            ml={isMobile ? 10 : 15}
            height={52.5}
            toolTip={t('This is the current discounted price of the tokens.')}
            toolTipPlacement="bottomLeft"
            toolTipTransform="translate(13%, 0%)"
          />
          <ListViewContent
            title={t('Discount')}
            valueColor={disabled ? null : parseFloat(bill?.discount) < 0 ? '#DF4141' : '#38A611'}
            value={disabled ? 'N/A' : `${bill?.discount}%`}
            width={isMobile ? 75 : 90}
            ml={isMobile ? 10 : 15}
            height={52.5}
            toolTip={t("This is the percentage discount relative to the token's current market price.")}
            toolTipPlacement="bottomLeft"
            toolTipTransform={parseFloat(bill?.discount) < 0 ? 'translate(25, 0%)' : 'translate(23%, 0%)'}
          />
          <ListViewContent
            title={t('Vesting Term')}
            value={`${vestingTime.days} days`}
            width={isMobile ? 105 : 105}
            ml={isMobile ? 10 : 15}
            height={52.5}
            toolTip={t('This is how long it will take for all tokens in the Bill to fully vest.')}
            toolTipPlacement={isMobile ? 'bottomRight' : 'bottomLeft'}
            toolTipTransform={isMobile ? 'translate(13%, 0%)' : 'translate(39%, 0%)'}
          />
          <ListViewContent
            title={t('Available Tokens')}
            value={disabled ? '0' : parseFloat(displayAvailable).toLocaleString(undefined)}
            width={isMobile ? 150 : 150}
            ml={isMobile ? 10 : 15}
            height={52.5}
            toolTip={t('This is the amount of available tokens for purchase.')}
            toolTipPlacement={isMobile ? 'bottomRight' : 'bottomLeft'}
            toolTipTransform={isMobile ? 'translate(13%, 0%)' : 'translate(39%, 0%)'}
          />
          {!isMobile && (
            <>
              <Flex style={{ height: '100%', alignItems: 'center' }}>
                {account ? (
                  <BillModal
                    bill={bill}
                    buttonText={disabled ? t('SOLD OUT') : t('BUY')}
                    id={bill.index}
                    buyFlag
                    disabled={!bill.discount || bill.discount.includes('NaN') || disabled}
                  />
                ) : (
                  <UnlockButton />
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
      expandedContent: isMobile && (
        <Flex sx={{ alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
          {account ? (
            <Flex sx={{ width: '100%', justifyContent: 'center', flexWrap: 'wrap' }}>
              {isSmall && (
                <>
                  <Flex style={{ width: '100%', justifyContent: 'space-between', padding: '0 10px' }}>
                    <TooltipBubble
                      placement={'bottomRight'}
                      transformTip={parseFloat(bill?.discount) < 0 ? 'translate(25, 0%)' : 'translate(23%, 0%)'}
                      body={<Flex>{t('This is the current discounted price of the tokens.')}</Flex>}
                      width="180px"
                      sx={{ display: 'flex' }}
                    >
                      <TitleText lineHeight={null} sx={{ display: 'flex' }}>
                        {t('Price')}
                        <HelpIcon width="12px" ml="5px" />
                      </TitleText>
                    </TooltipBubble>
                    <Text weight={700} size="12px">
                      {disabled ? 'N/A' : `$${bill?.priceUsd}`}
                    </Text>
                  </Flex>
                  <Flex style={{ width: '100%', justifyContent: 'space-between', padding: '0 10px' }}>
                    <TooltipBubble
                      placement={'bottomLeft'}
                      transformTip={parseFloat(bill?.discount) < 0 ? 'translate(25, 0%)' : 'translate(23%, 0%)'}
                      body={<Flex>{t('This is how long it will take for all tokens in the Bill to fully vest.')}</Flex>}
                      width="180px"
                    >
                      <TitleText lineHeight={null} sx={{ display: 'flex' }}>
                        {t('Vesting Term')}
                        <HelpIcon width="12px" ml="5px" />
                      </TitleText>
                    </TooltipBubble>
                    <Text weight={700} size="12px">
                      {`${vestingTime.days} days`}
                    </Text>
                  </Flex>
                  <Flex style={{ width: '100%', justifyContent: 'space-between', padding: '0 10px' }}>
                    <TooltipBubble
                      placement={'bottomLeft'}
                      transformTip={parseFloat(bill?.discount) < 0 ? 'translate(25, 0%)' : 'translate(23%, 0%)'}
                      body={<Flex>{t('This is the amount of available tokens for purchase.')}</Flex>}
                      width="180px"
                    >
                      <TitleText lineHeight={null} sx={{ display: 'flex' }}>
                        {t('Available Tokens')}
                        <HelpIcon width="12px" ml="5px" />
                      </TitleText>
                    </TooltipBubble>
                    <Text weight={700} size="12px">
                      {disabled ? '0' : parseFloat(displayAvailable).toLocaleString(undefined)}
                    </Text>
                  </Flex>
                </>
              )}
              <Flex sx={{ width: '100%', justifyContent: 'center', marginTop: '10px', maxWidth: '240px' }}>
                <BillModal
                  bill={bill}
                  buttonText={disabled ? t('SOLD OUT') : t('BUY')}
                  id={bill.index}
                  buyFlag
                  disabled={!bill.discount || bill.discount.includes('NaN') || disabled}
                />
              </Flex>
            </Flex>
          ) : (
            <UnlockButton />
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
