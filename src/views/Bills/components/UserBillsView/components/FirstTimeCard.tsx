/** @jsxImportSource theme-ui */
import { Text } from '@apeswapfinance/uikit'
import BillsDiagram from 'components/MarketingModalContent/Bills/BillsDiagram'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import { BillDiagramContainer, BillGifContainer, DescriptionContainer, FirstTimeCardContainer } from '../styles'
import { AnimatePresence, motion } from 'framer-motion'
import { Flex } from '@ape.swap/uikit'
import useDebounce from 'hooks/useDebounce'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useBills } from 'state/bills/hooks'

const FirstTimeCard = () => {
  const { t } = useTranslation()
  const { account } = useActiveWeb3React()
  const [loaded, setLoaded] = useState<boolean>(false)
  const bills = useBills()
  const ownedBillsAmount = bills?.flatMap((bill) => {
    if (bill?.userOwnedBillsData !== undefined && !loaded) {
      setLoaded(true)
    }
    return bill?.userOwnedBillsData ? bill?.userOwnedBillsData : []
  }).length

  // logic used to prevent FirstTimeCard to pop up abruptly
  const [showFirstTimeCard, setShowFirstTimeCard] = useState(false)
  const debouncedShowCard = useDebounce(showFirstTimeCard, 1000)
  useEffect(() => {
    setShowFirstTimeCard(!account || (ownedBillsAmount === 0 && loaded))
  }, [account, ownedBillsAmount, loaded])

  return (
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
            <FirstTimeCardContainer>
              <BillGifContainer>
                <img src={'images/bills/bill-nfts.gif'} alt="bill-img" />
              </BillGifContainer>
              <DescriptionContainer>
                <Text fontSize="22px" bold>
                  {t('Tips for buying bills')}
                </Text>
                <BillDiagramContainer>
                  <BillsDiagram />
                </BillDiagramContainer>
              </DescriptionContainer>
            </FirstTimeCardContainer>
          </Flex>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default React.memo(FirstTimeCard)
