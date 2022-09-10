import React from 'react'
import styled from 'styled-components'
import { Text, Spinner, Flex, Button } from '@apeswapfinance/uikit'
import { useTranslation } from 'contexts/Localization'
import Banner from 'components/Banner'
import Page from 'components/layout/Page'
import { useClaimRaffle, useFetchBabToken } from 'state/hooks'

const StyledHero = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  margin-bottom: 24px;
  padding-bottom: 32px;
`

const StyledAnchor = styled.a`
  font-weight: 800;
`

const Nft = () => {
  const { tokenId, loading, holdsBab } = useFetchBabToken()
  const { claim, claiming, hasClaimed } = useClaimRaffle()
  const { t } = useTranslation()

  return (
    <>
      <Page>
        <Banner
          banner="nfa-collection"
          link="https://ape-swap.medium.com/apeswap-adds-launch-support-for-binances-first-soulbound-token-dbb2e0e4c263"
          title={t('BAB Holders Raffle')}
          margin="0 0 20px 0"
        />
        <StyledHero>
          <Text fontSize="25px" style={{ textDecoration: 'underline', marginTop: '25px', color: 'subtle' }}>
            <StyledAnchor
              href="https://ape-swap.medium.com/apeswap-adds-launch-support-for-binances-first-soulbound-token-dbb2e0e4c263"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('Learn more at our medium article!')}
            </StyledAnchor>
          </Text>
        </StyledHero>
        {!loading ? (
          <div>
            <Text> {!holdsBab ? 'Does not hold Bab' : `Holds Bab of id: ${tokenId}`} </Text>
            {holdsBab && (
              <div>
                {hasClaimed ? (
                  <Text>Already Claimed</Text>
                ) : (
                  <Button onClick={() => claim(tokenId)} disabled={claiming}>
                    Claim Raffle
                  </Button>
                )}
              </div>
            )}
          </div>
        ) : (
          <Flex alignItems="center" justifyContent="center">
            <Spinner />
          </Flex>
        )}
      </Page>
    </>
  )
}

export default Nft
