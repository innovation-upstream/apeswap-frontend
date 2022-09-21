import { Bills } from 'state/types'

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

export interface ActionProps {
  bill: Bills
  disabled?: boolean
  onValueChange: (val: string) => void
  onBillId: (billId: string, transactionHash: string) => void
  onTransactionSubmited: (trxSent: boolean) => void
  value: string
  safeAvailable: string
}
