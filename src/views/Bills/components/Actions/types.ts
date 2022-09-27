import { Bills } from 'state/types'
import { Currency } from '@ape.swap/sdk'

export interface ClaimProps {
  billAddress: string
  pendingRewards: string
  billIds: string[]
  buttonSize?: number
}

export interface TransferProps {
  billNftAddress: string
  billId: string
  toAddress: string
  disabled?: boolean
}

export interface BuyProps {
  bill: Bills
  onBillId: (billId: string, transactionHash: string) => void
  onTransactionSubmited: (trxSent: boolean) => void
}

export interface BillActionsProps {
  bill: Bills
  currencyB: Currency
  handleBuy: () => void
  billValue: string
  value: string
  safeAvailable: string
  balance: string
  pendingTrx: boolean
}
