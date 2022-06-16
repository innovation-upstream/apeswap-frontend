import bills from '../../../config/constants/bills'

export const getBillType = (billAddress: string, chainId: number) => {
  const selectedBill = bills.find((bill) => bill.contractAddress[chainId].toLowerCase() === billAddress.toLowerCase())
  return selectedBill?.billType === 'BANANA Bill' ? 'bill' : selectedBill?.billType
}
