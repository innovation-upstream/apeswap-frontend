import React from 'react'
import styled from 'styled-components'
import { Button, useModal } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'
import useGetLotteryHasDrawn from 'hooks/useGetLotteryHasDrawn'
import { useLotteryAllowance } from 'hooks/useAllowance'
import useTickets from 'hooks/useTickets'
import useTokenBalance from 'hooks/useTokenBalance'
import { useApproval } from 'hooks/useApproval'
import { getBananaAddress } from 'utils/addressHelpers'
import BuyTicketModal from './BuyTicketModal'
import MyTicketsModal from './UserTicketsModal'
import PurchaseWarningModal from './PurchaseWarningModal'

const CardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[3]}px;

  ${({ theme }) => theme.mediaQueries.lg} {
    justify-content: space-between;
  }
`

const TicketCard: React.FC = () => {
  const TranslateString = useI18n()
  const allowance = useLotteryAllowance()
  const lotteryHasDrawn = useGetLotteryHasDrawn()
  const bananaBalance = useTokenBalance(getBananaAddress())
  const tickets = useTickets()
  const ticketsLength = tickets.length
  const [onPresentMyTickets] = useModal(<MyTicketsModal myTicketNumbers={tickets} from="buy" />)
  const [onPresentApprove] = useModal(<PurchaseWarningModal />)
  const [onPresentBuy] = useModal(<BuyTicketModal max={bananaBalance} tokenName="BANANA" />)
  const { handleApprove, requestedApproval } = useApproval(onPresentApprove)

  const renderLotteryTicketButtons = () => {
    if (!allowance.toNumber()) {
      return (
        <>
          <Button fullWidth disabled>
            {TranslateString(432, 'View your tickets')}
          </Button>
          <Button fullWidth disabled={requestedApproval} onClick={handleApprove}>
            {TranslateString(999, 'Approve BANANA')}
          </Button>
        </>
      )
    }
    return (
      <>
        <Button
          style={{ marginRight: '8px' }}
          fullWidth
          disabled={ticketsLength === 0}
          variant="secondary"
          onClick={onPresentMyTickets}
        >
          {TranslateString(432, 'View your tickets')}
        </Button>
        <Button id="lottery-buy-start" fullWidth onClick={onPresentBuy}>
          {TranslateString(430, 'Buy ticket')}
        </Button>
      </>
    )
  }

  return (
    <CardActions>
      {lotteryHasDrawn ? (
        <Button disabled> {TranslateString(999, 'On sale soon')}</Button>
      ) : (
        renderLotteryTicketButtons()
      )}
    </CardActions>
  )
}

export default TicketCard