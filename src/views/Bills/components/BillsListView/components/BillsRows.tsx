/** @jsxImportSource theme-ui */
import React from 'react'
import getTimePeriods from 'utils/getTimePeriods'
import BigNumber from 'bignumber.js'
import ListViewContent from 'components/ListViewV2/ListViewContent'
import ProjectLinks from '../../UserBillsView/components/ProjectLinks'
import ListViewContentMobile from 'components/ListViewV2/ListViewContentMobile'
import { Flex, InfoIcon, TooltipBubble, useMatchBreakpoints } from '@ape.swap/uikit'
import BillModal from '../../Modals'
import UnlockButton from 'components/UnlockButton'
import { ExtendedListViewProps } from 'components/ListView/types'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useTranslation } from 'contexts/Localization'
import ListView from 'components/ListViewV2'
import EmptyListComponent, { EmptyComponentType } from '../../EmptyListComponent/EmptyList'
import { Bills } from 'state/types'
import { formatNumberSI } from 'utils/formatNumber'

interface BillsRowsProps {
  billsToRender: Bills[]
  noResults: boolean
}

const BillsRows: React.FC<BillsRowsProps> = ({ billsToRender, noResults }) => {
  const { account, chainId } = useActiveWeb3React()
  const { t } = useTranslation()
  const { isLg, isXl, isXxl } = useMatchBreakpoints()
  const isMobile = !isLg && !isXl && !isXxl

  const billsListView = billsToRender.map((bill) => {
    const { earnToken, token, quoteToken, maxTotalPayOut, totalPayoutGiven, earnTokenPrice } = bill
    const vestingTime = getTimePeriods(parseInt(bill.vestingTime), true)
    const available = new BigNumber(maxTotalPayOut)
      ?.minus(new BigNumber(totalPayoutGiven))
      ?.div(new BigNumber(10).pow(earnToken.decimals[chainId]))

    const threshold = new BigNumber(11).div(earnTokenPrice)
    const disabled = new BigNumber(available).lte(threshold)

    const displayAvailable = available.toFixed(0)

    return {
      tokens: { token1: token.symbol, token2: quoteToken.symbol, token3: earnToken.symbol },
      stakeLp: true,
      id: bill.index,
      billArrow: true,
      title: <ListViewContent tag="ape" value={bill.lpToken.symbol} style={{ maxWidth: '150px', height: '45px' }} />,
      toolTipIconWidth: '15px',
      infoContentPosition: 'translate(10%, 0%)',
      titleContainerWidth: 280,
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
        <Flex style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
          <ListViewContent
            title={t('Discount')}
            valueColor={disabled ? null : parseFloat(bill?.discount) < 0 ? '#DF4141' : '#38A611'}
            value={disabled ? 'N/A' : `${bill?.discount}%`}
            value2={disabled ? '' : ` ($${parseFloat(bill?.priceUsd) < 0.001 ? '0.000...' : bill?.priceUsd})`}
            value2Secondary
            valuesDirection="row"
            style={{ maxWidth: '130px', ml: '10px' }}
            toolTip={`${disabled ? 'N/A' : `${t('Price:')} $${bill?.priceUsd}`}`}
            toolTipPlacement="bottomLeft"
            toolTipTransform={'translate(23%, 0%)'}
          />
          <ListViewContent
            title={t('Vesting Term')}
            value={vestingTime.days ? `${vestingTime.days} days` : 'NaN'}
            style={{ maxWidth: '105px', ml: '10px' }}
            toolTip={t('This is how long it will take for all tokens in the Bill to fully vest.')}
            toolTipPlacement="bottomLeft"
            toolTipTransform="translate(39%, 0%)"
          />
          <ListViewContent
            title={t('Available Tokens')}
            value={disabled ? '0' : formatNumberSI(parseFloat(displayAvailable), 3)}
            style={{ maxWidth: '125px', ml: '10px' }}
            toolTip={t('This is the amount of available tokens for purchase.')}
            toolTipPlacement="bottomLeft"
            toolTipTransform="translate(26%, 0%)"
          />
          <Flex sx={{ width: '100%', maxWidth: '185px', minWidth: '145px' }}>
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
            <Flex sx={{ alignItems: 'center', width: '40px', justifyContent: 'flex-end' }}>
              <TooltipBubble
                placement="bottomRight"
                transformTip="translate(8%, -2%)"
                body={<ProjectLinks website={bill?.projectLink} twitter={bill?.twitter} t={t} />}
              >
                <InfoIcon width="20px" />
              </TooltipBubble>
            </Flex>
          </Flex>
        </Flex>
      ),
      expandedContentSize: 150,
      expandedContent: isMobile && (
        <Flex sx={{ alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
          {account ? (
            <Flex sx={{ width: '100%', justifyContent: 'center', flexWrap: 'wrap' }}>
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
                  title={'Available'}
                  value={disabled ? '0' : formatNumberSI(parseFloat(displayAvailable), 2)}
                  toolTip={`This is the amount of available tokens for purchase.`}
                  toolTipPlacement={'bottomLeft'}
                  toolTipTransform={'translate(50%, 0%)'}
                />
              </Flex>
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
  return (
    <>
      {billsListView?.length ? (
        <ListView listViews={billsListView} />
      ) : (
        <EmptyListComponent type={noResults ? EmptyComponentType.NO_RESULTS : EmptyComponentType.AVAILABLE_BILLS} />
      )}
    </>
  )
}

export default React.memo(BillsRows)
