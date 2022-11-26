import { Text } from '@apeswapfinance/uikit'
import BillsDiagram from 'components/MarketingModalContent/Bills/BillsDiagram'
import ReactPlayer from 'react-player'
import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { BillDiagramContainer, BillGifContainer, DescriptionContainer, FirstTimeCardContainer } from './styles'

const FirstTimeCard: React.FC = () => {
  const { t } = useTranslation()
  return (
    <FirstTimeCardContainer>
      <BillGifContainer>
        <ReactPlayer playing muted loop url="videos/bills-video.mp4" height="100%" width="100%" playsInline />
      </BillGifContainer>
      <DescriptionContainer>
        <Text fontSize="18px" bold>
          {t('Tips for buying bills')}:
        </Text>
        <BillDiagramContainer>
          <BillsDiagram />
        </BillDiagramContainer>
      </DescriptionContainer>
    </FirstTimeCardContainer>
  )
}

export default React.memo(FirstTimeCard)
