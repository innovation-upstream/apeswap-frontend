import React from 'react'
import styled from 'styled-components'
import { Text, Spinner, Flex, Button, Card } from '@apeswapfinance/uikit'
import { useTranslation } from 'contexts/Localization'
import Banner from 'components/Banner'
import Page from 'components/layout/Page'
import { useClaimRaffle, useFetchBabToken } from 'state/hooks'
import ReactPlayer from 'react-player'
import { useWeb3React } from '@web3-react/core'
import ConnectButton from 'components/LiquidityWidget/ConnectButton'
import SwiperProvider from 'contexts/SwiperProvider'
import News from 'views/Homepage/components/News/News'
import Values from 'views/Homepage/components/Values/Values'

const StyledHero = styled.div`
  margin-top: 32px;
  padding: 20px;
  padding-bottom: 32px;
  background-color: ${({ theme }) => theme.colors.white4};
`

const StyledAnchor = styled.a`
  font-weight: 800;
`

const Nft = () => {
  const { account } = useWeb3React()
  const { tokenId, loading, holdsBab } = useFetchBabToken()
  const { claim, claiming, hasClaimed } = useClaimRaffle()
  const { t } = useTranslation()

  return (
    <>
      <Page>
        <Banner
          banner="BABbanner"
          link="https://ape-swap.medium.com/apeswap-adds-launch-support-for-binances-first-soulbound-token-dbb2e0e4c263"
          title={t('ApeSwap BAB Pass')}
          margin="0 0 20px 0"
        />
        <Text fontSize="40px" mb="24px" fontWeight="bold" style={{ textAlign: 'center' }}>
          Become Part of the ApeSwapBab Family
        </Text>
        <Flex alignItems="center" justifyContent="space-around">
          <div>
            <Text fontSize="20px" padding="20px">
              {t(`ApeSwap is proud to be one of the premiere platforms to add Binance’s BAB (Binance Account Bound) token
              support at its launch.`)}{' '}
              <br />
              <br />
              {t(`To celebrate the launch of the BAB token, ApeSwap and Binance BNB Chain have partnered to create a unique,
              commemorative NFT, free to mint for BAB Token holders for the month of September 2022.`)}
              <br />
              <br />
            </Text>
            {!loading ? (
              <div>
                {!account ? (
                  <ConnectButton />
                ) : (
                  <div>
                    <Text fontSize="20px" padding="20px">
                      {!holdsBab ? t('No BAB token found in wallet') : t('Holds BAB Token')}
                    </Text>
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
                )}
              </div>
            ) : (
              <Flex alignItems="center" justifyContent="center">
                <Spinner />
              </Flex>
            )}
          </div>
          <Card title="Raffle" background="heading" padding="20px">
            <ReactPlayer playing muted loop url="videos/bab-raffle.mp4" height="100%" width="100%" playsInline />
          </Card>
        </Flex>
        <StyledHero>
          <Text fontSize="40px" mb="24px" fontWeight="bold" style={{ textAlign: 'center' }}>
            Join the 30-day Non-fungible Banana NFT Raffle
          </Text>
          <Flex alignItems="center" justifyContent="space-around">
            <Card title="Raffle" background="background" padding="20px">
              <ReactPlayer playing muted loop url="videos/bab-nfb.mp4" height="100%" width="100%" playsInline />
            </Card>
            <div>
              <Text fontSize="20px" padding="20px">
                {t(`During the month of October the big 30-day ApeSwapNFT raffle will start.`)}
                <br />
                <br />
                {t(
                  `Holders of an ApeSwap BAB NFT automatically participate in the daily raffles. Make sure to come back to this page daily in October to see if you have won a Non-fungible Banana NFT.`,
                )}
                <br />
                <br />
              </Text>
            </div>
          </Flex>
          <Text
            fontSize="25px"
            style={{ textDecoration: 'underline', marginTop: '25px', color: 'subtle', textAlign: 'center' }}
          >
            <StyledAnchor
              href="https://ape-swap.medium.com/apeswap-adds-launch-support-for-binances-first-soulbound-token-dbb2e0e4c263"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('Learn more at our medium article')}
            </StyledAnchor>
          </Text>
        </StyledHero>
        <Text mt="48px" bold fontSize="22px" style={{ textAlign: 'center' }}>
          {t('Our News')}
        </Text>
        <SwiperProvider>
          <News />
        </SwiperProvider>
        <SwiperProvider>
          <Values />
        </SwiperProvider>
      </Page>
    </>
  )
}

export default Nft
