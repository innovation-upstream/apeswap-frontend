import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { StyledText, Description, TextButton, Hiw, MainBody, MainContentBody, StyledAnchor } from './styles'
import BillsDiagram from './BillsDiagram'

const BillsBody1: React.FC = () => {
  const { t } = useTranslation()
  return (
    <MainBody>
      <Description>
        <StyledText>
          {t(
            'Treasury Bills allows users to access tokens at a discount in exchange for their liquidity provider (LP) tokens.',
          )}
        </StyledText>
        <StyledText>
          {t(
            'Each Treasury Bill is a unique NFT that represents the contract and its respective reward tokens, which vest over a certain amount of time.',
          )}
        </StyledText>
        <StyledAnchor
          href="https://apeswap.gitbook.io/apeswap-finance/product-and-features/raise/treasury-bills"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TextButton>{t('For more info, visit the Treasury Bills page in our Documentation.')}</TextButton>
        </StyledAnchor>
        <Hiw>{t('How it works')}:</Hiw>
      </Description>
      <MainContentBody>
        <BillsDiagram />
      </MainContentBody>
    </MainBody>
  )
}

export default BillsBody1
