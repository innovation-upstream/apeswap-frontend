import { Text } from '@apeswapfinance/uikit'
import BillsDiagram from 'components/MarketingModalContent/Bills/BillsDiagram'
import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { BillDiagramContainer, BillGifContainer, DescriptionContainer, FirstTimeCardContainer } from './styles'

const FirstTimeCard: React.FC = () => {
  const { t } = useTranslation()
  return (
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
  )
}

export default React.memo(FirstTimeCard)
