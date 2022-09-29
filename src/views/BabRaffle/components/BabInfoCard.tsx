/** @jsxImportSource theme-ui */
import { Button, Flex, Spinner, Text } from '@ape.swap/uikit'
import UnlockButton from 'components/UnlockButton'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useIsMobile from 'hooks/useIsMobile'
import React from 'react'
import ReactPlayer from 'react-player'
import { useClaimRaffle, useFetchBabToken } from 'state/hooks'
import { styles } from '../styles'
import NumberedList from './NumberedList'

const BabInfoCard: React.FC = () => {
  const { t } = useTranslation()
  const { tokenId, loading, holdsBab } = useFetchBabToken()
  const { claim, claiming, hasClaimed } = useClaimRaffle()
  const { account } = useActiveWeb3React()
  const isMobile = useIsMobile()

  // Not connected -> Connect Wallet
  // Connected
  // -> No Bab Token (No Bab Token Detected)
  // -> Holds Bab
  // ----> Minted (Show NFT)
  // ----> Not Minted (Mint)

  return (
    <Flex
      sx={{
        background: 'white2',
        padding: '20px',
        borderRadius: '10px',
        '@media screen and (max-width: 725px)': { flexWrap: 'wrap' },
      }}
    >
      <Flex sx={{ borderRadius: '10px' }}>
        <ReactPlayer
          playing
          muted
          loop
          url="videos/bab-raffle.mp4"
          height="100%"
          maxHeight="100px"
          width="100%"
          playsInline
        />
      </Flex>
      <Flex
        sx={{
          flexDirection: 'column',
          padding: '0 50px',
          '@media screen and (max-width: 725px)': { padding: '0px 0px' },
        }}
      >
        <Flex
          sx={{
            flexDirection: 'column',
            alignItems: ['center', 'flex-start'],
            textAlign: ['center', 'start'],
          }}
        >
          <Text
            weight={700}
            sx={{ lineHeight: '35px', fontSize: '22px', marginBottom: '6px', marginTop: '15px', fontWeight: 700 }}
          >
            {isMobile ? t('ApeSwap x BAB') : t('ApeSwap x Binance Account Bound Token')}
          </Text>
          <Text sx={styles.playBody}>
            {t(
              `ApeSwap is proud to be one of the first platforms to add support for Binance's BAB (Binance Account Bound) token at its launch.`,
            )}
          </Text>
          <Text sx={styles.playBody}>
            {t(
              `To celebrate the launch of the BAB token, ApeSwap and Binance BNB Chain have partnered to create a unique, commemorative NFT, free to mint for BAB Token holders for the month of September 2022.`,
            )}
          </Text>
        </Flex>
        <Flex sx={{ flexDirection: 'column', gap: '10px' }}>
          <NumberedList
            title="1- Mint Your BAB Token ✅"
            description="To mint an ApeSwap BAB Club NFT, you must first mint a BAB token."
            showBtn
            t={t}
          />
          <NumberedList
            title="2- Claim Raffle NFT ✅"
            description="Mint your ApeSwap BAB Club Token to be eligible for the Non Fungible Banana NFT giveaway."
            t={t}
          />
          <NumberedList
            title="3- Good Luck! ✅"
            description="You are now participating in the Raffle. Visit this page each day to see if you've won!"
            t={t}
          />
        </Flex>
        <Flex sx={{ alignItems: 'center', justifyContent: 'center', mt: '20px' }}>
          {!loading ? (
            <div>
              {!account ? (
                <UnlockButton />
              ) : (
                <div>
                  <Text sx={styles.walletHolds}>
                    {!holdsBab ? (
                      <Button disabled>{t('No Bab Token Detected')}</Button>
                    ) : (
                      t('Your wallet holds a BAB Token')
                    )}
                  </Text>
                  {holdsBab && (
                    <Text sx={styles.walletHolds}>
                      {hasClaimed ? (
                        <Button onClick={null} fullWidth sx={{ marginTop: '10px' }}>
                          {t('Show NFT')}
                        </Button>
                      ) : (
                        <Button onClick={() => claim(tokenId)} disabled={claiming}>
                          {t('Mint')}
                        </Button>
                      )}
                    </Text>
                  )}
                </div>
              )}
            </div>
          ) : (
            <Spinner size={130} />
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default React.memo(BabInfoCard)
