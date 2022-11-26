import React from 'react'
import { BillsM1, BillsM2, BillsM3, Flex, Text } from '@ape.swap/uikit'
import useTheme from 'hooks/useTheme'
import { useTranslation } from 'contexts/Localization'
import { Content, RightText, Surround, RightContent, InnerTextButton } from './styles'

const BillsDiagram: React.FC = () => {
  const theme = useTheme()
  const { t } = useTranslation()

  return (
    <Flex sx={{ flexDirection: 'column' }}>
      <Surround>
        <Content>
          <BillsM1 width={50} bgColor={theme.theme.colors.white4} color={theme.theme.colors.text} mr={15} />
          <RightContent>
            <RightText>
              {t(
                'The token discount is calculated based on several variables: token price, LP price, time, supply, and demand.',
              )}
            </RightText>
          </RightContent>
        </Content>
        <Content>
          <BillsM2 width={50} bgColor={theme.theme.colors.white4} color={theme.theme.colors.text} mr={15} />
          <RightContent>
            <RightText>{t('Use Zap ⚡ to purchase a Bill with a single token or create an LP.')}</RightText>
          </RightContent>
        </Content>

        <Content>
          <BillsM3 width={50} bgColor={theme.theme.colors.white4} color={theme.theme.colors.text} mr={15} />
          <RightContent>
            <RightText>{t('To mint a full color NFT, purchase a Bill with a value of $25 or more.')}</RightText>
          </RightContent>
        </Content>
      </Surround>
      <Text size="12px" weight={500} mt={5}>
        {t('Treasury Bills have a limited supply and will sell out. Read the ')}
        <InnerTextButton
          href="https://apeswap.gitbook.io/apeswap-finance/product-and-features/raise/treasury-bills"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('Documentation.')}
        </InnerTextButton>
      </Text>
    </Flex>
  )
}

export default BillsDiagram
